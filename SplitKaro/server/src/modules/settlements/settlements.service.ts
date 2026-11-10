import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { assertFriends, assertGroupMembers } from '../../common/access.js';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { ListExpensesDto } from '../expenses/dto/list-expenses.dto.js';
import { CreateSettlementDto } from './dto/create-settlement.dto.js';

const USER_SELECT = { id: true, name: true, email: true } as const;

const SETTLEMENT_SELECT = {
  id: true,
  amount: true,
  date: true,
  createdAt: true,
  group: { select: { id: true, name: true } },
  payer: { select: USER_SELECT },
  payee: { select: USER_SELECT },
} satisfies Prisma.SettlementSelect;

@Injectable()
export class SettlementsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateSettlementDto) {
    if (dto.payerId === dto.payeeId) {
      throw new BadRequestException('Payer and receiver must be different people');
    }
    if (dto.payerId !== userId && dto.payeeId !== userId) {
      throw new BadRequestException('You must be the payer or the receiver');
    }

    const otherId = dto.payerId === userId ? dto.payeeId : dto.payerId;
    if (dto.groupId) {
      await assertGroupMembers(this.prisma, dto.groupId, [userId, otherId]);
    } else {
      await assertFriends(this.prisma, userId, [otherId]);
    }

    return this.prisma.settlement.create({
      data: {
        amount: Math.round(dto.amount * 100),
        date: dto.date ?? new Date(),
        payerId: dto.payerId,
        payeeId: dto.payeeId,
        createdById: userId,
        groupId: dto.groupId,
      },
      select: SETTLEMENT_SELECT,
    });
  }

  async list(userId: string, { groupId, friendId }: ListExpensesDto) {
    const where: Prisma.SettlementWhereInput[] = [];
    if (groupId) {
      await assertGroupMembers(this.prisma, groupId, [userId]);
      where.push({ groupId });
    } else {
      where.push(this.involves(userId));
    }
    if (friendId) where.push(this.involves(friendId));

    return this.prisma.settlement.findMany({
      where: { AND: where },
      select: SETTLEMENT_SELECT,
      orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async remove(userId: string, id: string) {
    const { count } = await this.prisma.settlement.deleteMany({
      where: { id, ...this.involves(userId) },
    });
    if (count === 0) throw new NotFoundException('Payment not found');
  }

  private involves(userId: string): Prisma.SettlementWhereInput {
    return { OR: [{ payerId: userId }, { payeeId: userId }] };
  }
}
