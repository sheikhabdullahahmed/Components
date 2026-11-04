import { Injectable } from '@nestjs/common';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  // Only place the password hash is read; used for login checks.
  findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({ where: { email }, omit: { password: false } });
  }

  // Matches by Google id first, then links an existing account with the same email.
  async upsertGoogleUser({ googleId, email, name }: { googleId: string; email: string; name?: string }) {
    const linked = await this.prisma.user.findUnique({ where: { googleId } });
    if (linked) return linked;

    return this.prisma.user.upsert({
      where: { email },
      update: { googleId },
      create: { googleId, email, name },
    });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
