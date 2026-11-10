import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import type { AdminListDto } from './dto/admin-list.dto.js';

const USER_SELECT = { id: true, name: true, email: true } as const;

const page = ({ page, pageSize }: AdminListDto) => ({
  skip: (page - 1) * pageSize,
  take: pageSize,
});

const paged = <T>(items: T[], total: number, { page, pageSize }: AdminListDto) => ({
  items,
  total,
  page,
  pageSize,
});

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async overview() {
    const [users, groups, expenses, settlements, invites, volume] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.group.count(),
      this.prisma.expense.count(),
      this.prisma.settlement.count(),
      this.prisma.friendInvite.count(),
      this.prisma.expense.aggregate({ _sum: { amount: true } }),
    ]);
    // Amounts are in paisa.
    return { users, groups, expenses, settlements, invites, totalAmount: volume._sum.amount ?? 0 };
  }

  async listUsers(query: AdminListDto) {
    const search = query.search?.trim();
    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' } },
            { name: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [rows, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...page(query),
        select: {
          ...USER_SELECT,
          googleId: true,
          createdAt: true,
          _count: { select: { friendships: true, memberships: true, expensesPaid: true } },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const items = rows.map(({ googleId, _count, ...user }) => ({
      ...user,
      google: googleId !== null,
      friends: _count.friendships,
      groups: _count.memberships,
      expenses: _count.expensesPaid,
    }));
    return paged(items, total, query);
  }

  // Deleting a user also deletes (by cascade) their expenses, comments, friendships, payments
  // and the groups they created, so those groups' expenses go too.
  async removeUser(adminId: string, id: string) {
    if (id === adminId) throw new BadRequestException('You cannot delete your own account here');
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true } });
    if (!user) throw new NotFoundException('User not found');

    const keys = await this.receiptKeys({
      OR: [{ paidById: id }, { createdById: id }, { group: { createdById: id } }],
    });
    await this.prisma.user.delete({ where: { id } });
    await this.deleteStoredFiles(keys);
  }

  async listInvites(query: AdminListDto) {
    const search = query.search?.trim();
    const where: Prisma.FriendInviteWhereInput = search
      ? { email: { contains: search, mode: 'insensitive' } }
      : {};

    const [items, total] = await this.prisma.$transaction([
      this.prisma.friendInvite.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...page(query),
        select: { id: true, email: true, createdAt: true, invitedBy: { select: USER_SELECT } },
      }),
      this.prisma.friendInvite.count({ where }),
    ]);
    return paged(items, total, query);
  }

  async removeInvite(id: string) {
    const { count } = await this.prisma.friendInvite.deleteMany({ where: { id } });
    if (count === 0) throw new NotFoundException('Invite not found');
  }

  async listExpenses(query: AdminListDto) {
    const search = query.search?.trim();
    const where: Prisma.ExpenseWhereInput = search
      ? { description: { contains: search, mode: 'insensitive' } }
      : {};

    const [items, total] = await this.prisma.$transaction([
      this.prisma.expense.findMany({
        where,
        orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
        ...page(query),
        select: {
          id: true,
          description: true,
          amount: true,
          date: true,
          receiptUrl: true,
          group: { select: { id: true, name: true } },
          paidBy: { select: USER_SELECT },
          _count: { select: { comments: true, splits: true } },
        },
      }),
      this.prisma.expense.count({ where }),
    ]);
    return paged(items, total, query);
  }

  async removeExpense(id: string) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      select: { receiptKey: true },
    });
    if (!expense) throw new NotFoundException('Expense not found');
    await this.prisma.expense.delete({ where: { id } });
    await this.deleteStoredFiles([expense.receiptKey]);
  }

  async listGroups(query: AdminListDto) {
    const search = query.search?.trim();
    const where: Prisma.GroupWhereInput = search
      ? { name: { contains: search, mode: 'insensitive' } }
      : {};

    const [items, total] = await this.prisma.$transaction([
      this.prisma.group.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...page(query),
        select: {
          id: true,
          name: true,
          createdAt: true,
          createdBy: { select: USER_SELECT },
          _count: { select: { members: true, expenses: true } },
        },
      }),
      this.prisma.group.count({ where }),
    ]);
    return paged(items, total, query);
  }

  // Deleting a group also deletes its expenses and payments.
  async removeGroup(id: string) {
    const group = await this.prisma.group.findUnique({ where: { id }, select: { id: true } });
    if (!group) throw new NotFoundException('Group not found');

    const keys = await this.receiptKeys({ groupId: id });
    await this.prisma.group.delete({ where: { id } });
    await this.deleteStoredFiles(keys);
  }

  private async receiptKeys(where: Prisma.ExpenseWhereInput) {
    const rows = await this.prisma.expense.findMany({
      where: { AND: [where, { receiptKey: { not: null } }] },
      select: { receiptKey: true },
    });
    return rows.map((row) => row.receiptKey);
  }

  // A leftover file is harmless, so a storage failure must not fail the request.
  private async deleteStoredFiles(keys: (string | null)[]) {
    await Promise.all(
      keys.filter((key): key is string => key !== null).map((key) =>
        this.storage.delete(key).catch(() => undefined),
      ),
    );
  }
}
