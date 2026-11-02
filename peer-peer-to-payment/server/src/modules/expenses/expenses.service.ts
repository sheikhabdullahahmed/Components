import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { assertFriends, assertGroupMembers } from '../../common/access.js';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { ListExpensesDto } from './dto/list-expenses.dto.js';

const USER_SELECT = { id: true, name: true, email: true } as const;

const EXPENSE_SELECT = {
  id: true,
  description: true,
  amount: true,
  date: true,
  createdAt: true,
  group: { select: { id: true, name: true } },
  paidBy: { select: USER_SELECT },
  createdBy: { select: USER_SELECT },
  splits: { select: { amount: true, user: { select: USER_SELECT } } },
} satisfies Prisma.ExpenseSelect;

// Splits `total` paisa into `count` equal shares; leftover paisa go to the first shares.
export function splitEqually(total: number, count: number) {
  const base = Math.floor(total / count);
  const remainder = total - base * count;
  return Array.from({ length: count }, (_, i) => base + (i < remainder ? 1 : 0));
}

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

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

    return this.prisma.expense.create({
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
    await this.findOne(userId, id);
    await this.prisma.expense.delete({ where: { id } });
  }

  private involves(userId: string): Prisma.ExpenseWhereInput {
    return { OR: [{ paidById: userId }, { splits: { some: { userId } } }] };
  }
}
