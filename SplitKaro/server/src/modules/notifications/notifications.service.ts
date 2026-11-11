import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import type { NotificationType, Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

const NOTIFICATION_SELECT = {
  id: true,
  type: true,
  message: true,
  expenseId: true,
  groupId: true,
  readAt: true,
  createdAt: true,
  actor: { select: { id: true, name: true, email: true } },
} satisfies Prisma.NotificationSelect;

export type NotifyInput = {
  actorId: string;
  // The actor is removed from this list, so people are never notified about their own actions.
  recipientIds: string[];
  type: NotificationType;
  message: string;
  expenseId?: string;
  groupId?: string;
};

const PAGE_SIZE = 20;

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  // A failed notification must never fail the request that triggered it.
  async notify({ actorId, recipientIds, ...rest }: NotifyInput) {
    const recipients = [...new Set(recipientIds)].filter((id) => id !== actorId);
    if (recipients.length === 0) return;
    try {
      await this.prisma.notification.createMany({
        data: recipients.map((userId) => ({ userId, actorId, ...rest })),
      });
    } catch (error) {
      this.logger.error(`Could not create "${rest.type}" notifications`, error as Error);
    }
  }

  // Cursor pagination: pass the last notification's id as `cursor` to get the next page.
  async list(userId: string, cursor?: string) {
    const rows = await this.prisma.notification.findMany({
      where: { userId },
      select: NOTIFICATION_SELECT,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: PAGE_SIZE + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    });
    const hasMore = rows.length > PAGE_SIZE;
    const items = hasMore ? rows.slice(0, PAGE_SIZE) : rows;
    return { items, nextCursor: hasMore ? items[items.length - 1].id : null };
  }

  // Name shown in messages: the user's name, or their email if they have none.
  async displayName(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true, email: true },
    });
    return user.name ?? user.email;
  }

  async unreadCount(userId: string) {
    return { count: await this.prisma.notification.count({ where: { userId, readAt: null } }) };
  }

  async markRead(userId: string, id: string) {
    const { count } = await this.prisma.notification.updateMany({
      where: { id, userId, readAt: null },
      data: { readAt: new Date() },
    });
    if (count === 0) {
      // Already read is fine; only a missing/foreign notification is an error.
      const exists = await this.prisma.notification.count({ where: { id, userId } });
      if (!exists) throw new NotFoundException('Notification not found');
    }
  }

  async markAllRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
  }
}
