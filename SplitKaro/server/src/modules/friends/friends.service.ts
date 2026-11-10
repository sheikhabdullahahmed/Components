import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';

const FRIEND_SELECT = { id: true, name: true, email: true } as const;

@Injectable()
export class FriendsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  async list(userId: string) {
    const rows = await this.prisma.friendship.findMany({
      where: { userId },
      select: { friend: { select: FRIEND_SELECT } },
      orderBy: { friend: { name: 'asc' } },
    });
    return rows.map((row) => row.friend);
  }

  listInvites(userId: string) {
    return this.prisma.friendInvite.findMany({
      where: { invitedById: userId },
      select: { id: true, email: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Adds a signed-up user right away; otherwise keeps an invite for when they sign up.
  async add(userId: string, rawEmail: string) {
    const email = rawEmail.toLowerCase();
    const friend = await this.prisma.user.findUnique({ where: { email }, select: FRIEND_SELECT });

    if (friend?.id === userId) {
      throw new BadRequestException('You cannot add yourself as a friend');
    }

    const adder = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true, email: true },
    });

    if (friend) {
      const { count } = await this.link(userId, friend.id);
      // Only email when the friendship is new, so re-adding doesn't spam them.
      if (count > 0) void this.mail.sendFriendAdded(friend.email, adder);
      return { status: 'added' as const, friend };
    }

    const existing = await this.prisma.friendInvite.findUnique({
      where: { invitedById_email: { invitedById: userId, email } },
      select: { id: true },
    });
    if (!existing) {
      await this.prisma.friendInvite.create({ data: { invitedById: userId, email } });
      void this.mail.sendFriendInvite(email, adder);
    }
    return { status: 'invited' as const, email };
  }

  async remove(userId: string, friendId: string) {
    const { count } = await this.prisma.friendship.deleteMany({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });
    if (count === 0) throw new NotFoundException('Friend not found');
  }

  async cancelInvite(userId: string, inviteId: string) {
    const { count } = await this.prisma.friendInvite.deleteMany({
      where: { id: inviteId, invitedById: userId },
    });
    if (count === 0) throw new NotFoundException('Invite not found');
  }

  // Called after signup/Google login: everyone who invited this email becomes a friend.
  async acceptInvites(user: { id: string; email: string }) {
    const invites = await this.prisma.friendInvite.findMany({ where: { email: user.email } });
    if (invites.length === 0) return;

    await this.prisma.$transaction([
      this.prisma.friendship.createMany({
        data: invites.flatMap((invite) => [
          { userId: invite.invitedById, friendId: user.id },
          { userId: user.id, friendId: invite.invitedById },
        ]),
        skipDuplicates: true,
      }),
      this.prisma.friendInvite.deleteMany({ where: { email: user.email } }),
    ]);
  }

  private link(userId: string, friendId: string) {
    return this.prisma.friendship.createMany({
      data: [
        { userId, friendId },
        { userId: friendId, friendId: userId },
      ],
      skipDuplicates: true,
    });
  }
}
