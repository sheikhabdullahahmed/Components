import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

const USER_SELECT = { id: true, name: true, email: true } as const;

@Injectable()
export class BalancesService {
  constructor(private readonly prisma: PrismaService) {}

  // Net amount (paisa) per person: positive = they owe you, negative = you owe them.
  async forUser(userId: string, groupId?: string) {
    // Only splits the user is part of: their own share, or shares of expenses they paid.
    const splits = await this.prisma.expenseSplit.findMany({
      where: {
        expense: { groupId },
        OR: [{ userId }, { expense: { paidById: userId } }],
      },
      select: { userId: true, amount: true, expense: { select: { paidById: true } } },
    });

    const net = new Map<string, number>();
    for (const { userId: debtorId, amount, expense } of splits) {
      const payerId = expense.paidById;
      if (debtorId === payerId) continue;
      if (payerId === userId) net.set(debtorId, (net.get(debtorId) ?? 0) + amount);
      else if (debtorId === userId) net.set(payerId, (net.get(payerId) ?? 0) - amount);
    }

    // A payment reduces what the payer owed the payee.
    const settlements = await this.prisma.settlement.findMany({
      where: { groupId, OR: [{ payerId: userId }, { payeeId: userId }] },
      select: { payerId: true, payeeId: true, amount: true },
    });
    for (const { payerId, payeeId, amount } of settlements) {
      if (payerId === userId) net.set(payeeId, (net.get(payeeId) ?? 0) + amount);
      else net.set(payerId, (net.get(payerId) ?? 0) - amount);
    }

    const ids = [...net.keys()].filter((id) => net.get(id) !== 0);
    const users = await this.prisma.user.findMany({
      where: { id: { in: ids } },
      select: USER_SELECT,
    });

    const people = users
      .map((user) => ({ user, amount: net.get(user.id)! }))
      .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

    const totalOwed = people.filter((p) => p.amount > 0).reduce((sum, p) => sum + p.amount, 0);
    const totalOwe = people.filter((p) => p.amount < 0).reduce((sum, p) => sum - p.amount, 0);

    return { net: totalOwed - totalOwe, totalOwed, totalOwe, people };
  }
}
