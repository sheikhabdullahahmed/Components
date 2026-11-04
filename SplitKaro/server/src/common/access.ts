import { BadRequestException } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service.js';

// Shared checks for anything recorded between people (expenses, settlements).

export async function assertGroupMembers(prisma: PrismaService, groupId: string, userIds: string[]) {
  const count = await prisma.groupMember.count({ where: { groupId, userId: { in: userIds } } });
  if (count !== userIds.length) {
    throw new BadRequestException('Everyone involved must be a member of the group');
  }
}

export async function assertFriends(prisma: PrismaService, userId: string, ids: string[]) {
  if (ids.length === 0) return;
  const count = await prisma.friendship.count({ where: { userId, friendId: { in: ids } } });
  if (count !== ids.length) {
    throw new BadRequestException('You can only do this with your friends');
  }
}
