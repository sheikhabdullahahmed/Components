import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateGroupDto } from './dto/create-group.dto.js';

const MEMBER_SELECT = { id: true, name: true, email: true } as const;

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.group.findMany({
      where: { members: { some: { userId } } },
      select: { id: true, name: true, _count: { select: { members: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, { name, memberIds = [] }: CreateGroupDto) {
    const others = [...new Set(memberIds)].filter((id) => id !== userId);
    await this.assertFriends(userId, others);

    const group = await this.prisma.group.create({
      data: {
        name: name.trim(),
        createdById: userId,
        members: { create: [userId, ...others].map((id) => ({ userId: id })) },
      },
    });
    return this.findOne(userId, group.id);
  }

  async findOne(userId: string, groupId: string) {
    const group = await this.prisma.group.findFirst({
      where: { id: groupId, members: { some: { userId } } },
      select: {
        id: true,
        name: true,
        createdById: true,
        createdAt: true,
        members: { select: { user: { select: MEMBER_SELECT } }, orderBy: { joinedAt: 'asc' } },
      },
    });
    // Non-members get 404 so group ids can't be probed.
    if (!group) throw new NotFoundException('Group not found');

    const { members, ...rest } = group;
    return { ...rest, members: members.map((m) => m.user) };
  }

  async rename(userId: string, groupId: string, name: string) {
    await this.findOne(userId, groupId);
    await this.prisma.group.update({ where: { id: groupId }, data: { name: name.trim() } });
    return this.findOne(userId, groupId);
  }

  // Any member can add one of their own friends.
  async addMember(userId: string, groupId: string, memberId: string) {
    await this.findOne(userId, groupId);
    if (memberId === userId) throw new BadRequestException('You are already in this group');
    await this.assertFriends(userId, [memberId]);

    await this.prisma.groupMember.createMany({
      data: [{ groupId, userId: memberId }],
      skipDuplicates: true,
    });
    return this.findOne(userId, groupId);
  }

  // Members can remove anyone, including themselves (leaving). An empty group is deleted.
  async removeMember(userId: string, groupId: string, memberId: string) {
    await this.findOne(userId, groupId);
    const { count } = await this.prisma.groupMember.deleteMany({
      where: { groupId, userId: memberId },
    });
    if (count === 0) throw new NotFoundException('Member not found');

    const remaining = await this.prisma.groupMember.count({ where: { groupId } });
    if (remaining === 0) await this.prisma.group.delete({ where: { id: groupId } });
  }

  async remove(userId: string, groupId: string) {
    const group = await this.findOne(userId, groupId);
    if (group.createdById !== userId) {
      throw new ForbiddenException('Only the person who created the group can delete it');
    }
    await this.prisma.group.delete({ where: { id: groupId } });
  }

  private async assertFriends(userId: string, ids: string[]) {
    if (ids.length === 0) return;
    const count = await this.prisma.friendship.count({
      where: { userId, friendId: { in: ids } },
    });
    if (count !== ids.length) {
      throw new BadRequestException('You can only add your friends to a group');
    }
  }
}
