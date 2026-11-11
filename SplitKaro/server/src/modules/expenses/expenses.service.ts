import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { assertFriends, assertGroupMembers } from '../../common/access.js';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { UploadedImage } from '../storage/uploaded-file.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { StorageService } from '../storage/storage.service.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { ListExpensesDto } from './dto/list-expenses.dto.js';

const USER_SELECT = { id: true, name: true, email: true } as const;

const EXPENSE_SELECT = {
  id: true,
  description: true,
  amount: true,
  date: true,
  createdAt: true,
  receiptUrl: true,
  _count: { select: { comments: true } },
  group: { select: { id: true, name: true } },
  paidBy: { select: USER_SELECT },
  createdBy: { select: USER_SELECT },
  splits: { select: { amount: true, user: { select: USER_SELECT } } },
} satisfies Prisma.ExpenseSelect;

const COMMENT_SELECT = {
  id: true,
  body: true,
  createdAt: true,
  user: { select: USER_SELECT },
} satisfies Prisma.ExpenseCommentSelect;

// Splits `total` paisa into `count` equal shares; leftover paisa go to the first shares.
export function splitEqually(total: number, count: number) {
  const base = Math.floor(total / count);
  const remainder = total - base * count;
  return Array.from({ length: count }, (_, i) => base + (i < remainder ? 1 : 0));
}

@Injectable()
export class ExpensesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    private readonly notifications: NotificationsService,
  ) {}

  async create(userId: string, dto: CreateExpenseDto) {
    const participantIds = [...new Set(dto.participantIds)];
    const involved = new Set([userId, dto.paidById, ...participantIds]);
    if (involved.size < 2) {
      throw new BadRequestException('An expense needs at least one other person');
    }

    if (dto.groupId) {
      await assertGroupMembers(this.prisma, dto.groupId, [...involved]);
    } else {
      await assertFriends(this.prisma, userId, [...involved].filter((id) => id !== userId));
    }
    if (!participantIds.includes(userId) && dto.paidById !== userId) {
      throw new BadRequestException('You must be the payer or one of the people splitting');
    }

    const amount = Math.round(dto.amount * 100);
    const shares = splitEqually(amount, participantIds.length);

    const expense = await this.prisma.expense.create({
      data: {
        description: dto.description.trim(),
        amount,
        date: dto.date ?? new Date(),
        paidById: dto.paidById,
        createdById: userId,
        groupId: dto.groupId,
        splits: {
          create: participantIds.map((id, i) => ({ userId: id, amount: shares[i] })),
        },
      },
      select: EXPENSE_SELECT,
    });

    const actor = await this.notifications.displayName(userId);
    await this.notifications.notify({
      actorId: userId,
      recipientIds: [...involved],
      type: 'EXPENSE_ADDED',
      message: `${actor} added "${expense.description}" (Rs ${amount / 100})`,
      expenseId: expense.id,
      groupId: dto.groupId,
    });
    return expense;
  }

  async list(userId: string, { groupId, friendId }: ListExpensesDto) {
    const where: Prisma.ExpenseWhereInput[] = [];
    if (groupId) {
      await assertGroupMembers(this.prisma, groupId, [userId]);
      // Within a group, show every expense, not only the ones involving the user.
      where.push({ groupId });
    } else {
      where.push(this.involves(userId));
    }
    if (friendId) where.push(this.involves(friendId));

    return this.prisma.expense.findMany({
      where: { AND: where },
      select: EXPENSE_SELECT,
      orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(userId: string, id: string) {
    const expense = await this.prisma.expense.findFirst({
      where: { id, OR: [this.involves(userId), { group: { members: { some: { userId } } } }] },
      select: EXPENSE_SELECT,
    });
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  async remove(userId: string, id: string) {
    const found = await this.findOne(userId, id);
    const expense = await this.prisma.expense.delete({ where: { id }, select: { receiptKey: true } });
    await this.deleteStoredFile(expense.receiptKey);

    const actor = await this.notifications.displayName(userId);
    await this.notifications.notify({
      actorId: userId,
      recipientIds: this.participantIds(found),
      type: 'EXPENSE_DELETED',
      message: `${actor} deleted "${found.description}"`,
      groupId: found.group?.id,
    });
  }

  async setReceipt(userId: string, id: string, file: UploadedImage | undefined) {
    if (!file) throw new BadRequestException('Attach an image in the "file" field');
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('The receipt must be an image');
    }
    await this.findOne(userId, id);

    const { url, key } = await this.storage.upload(file.buffer, 'splitkaro/receipts');
    const old = await this.prisma.expense.findUniqueOrThrow({
      where: { id },
      select: { receiptKey: true },
    });
    const expense = await this.prisma.expense.update({
      where: { id },
      data: { receiptUrl: url, receiptKey: key },
      select: EXPENSE_SELECT,
    });
    await this.deleteStoredFile(old.receiptKey);
    return expense;
  }

  async removeReceipt(userId: string, id: string) {
    await this.findOne(userId, id);
    const old = await this.prisma.expense.findUniqueOrThrow({
      where: { id },
      select: { receiptKey: true },
    });
    await this.prisma.expense.update({
      where: { id },
      data: { receiptUrl: null, receiptKey: null },
    });
    await this.deleteStoredFile(old.receiptKey);
  }

  async listComments(userId: string, expenseId: string) {
    await this.findOne(userId, expenseId);
    return this.prisma.expenseComment.findMany({
      where: { expenseId },
      select: COMMENT_SELECT,
      orderBy: { createdAt: 'asc' },
    });
  }

  async addComment(userId: string, expenseId: string, dto: CreateCommentDto) {
    const expense = await this.findOne(userId, expenseId);
    const comment = await this.prisma.expenseComment.create({
      data: { expenseId, userId, body: dto.body.trim() },
      select: COMMENT_SELECT,
    });

    // The expense's people, plus anyone who already commented on it.
    const commenters = await this.prisma.expenseComment.findMany({
      where: { expenseId },
      select: { userId: true },
      distinct: ['userId'],
    });
    const actor = await this.notifications.displayName(userId);
    await this.notifications.notify({
      actorId: userId,
      recipientIds: [...this.participantIds(expense), ...commenters.map((c) => c.userId)],
      type: 'EXPENSE_COMMENT',
      message: `${actor} commented on "${expense.description}"`,
      expenseId,
      groupId: expense.group?.id,
    });
    return comment;
  }

  async removeComment(userId: string, expenseId: string, commentId: string) {
    await this.findOne(userId, expenseId);
    const comment = await this.prisma.expenseComment.findFirst({
      where: { id: commentId, expenseId },
      select: { userId: true },
    });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId) throw new ForbiddenException('You can only delete your own comments');
    await this.prisma.expenseComment.delete({ where: { id: commentId } });
  }

  // A leftover file is harmless, so a storage failure must not fail the request.
  private async deleteStoredFile(key: string | null) {
    if (!key) return;
    await this.storage.delete(key).catch(() => undefined);
  }

  // The payer and everyone the expense is split with.
  private participantIds(expense: { paidBy: { id: string }; splits: { user: { id: string } }[] }) {
    return [expense.paidBy.id, ...expense.splits.map((s) => s.user.id)];
  }

  private involves(userId: string): Prisma.ExpenseWhereInput {
    return { OR: [{ paidById: userId }, { splits: { some: { userId } } }] };
  }
}
