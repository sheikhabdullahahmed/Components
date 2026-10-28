import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersService } from '../users/users.service.js';
import type { JwtPayload } from './auth.constants.js';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async signup({ name, email, password }: SignupDto) {
    const normalizedEmail = email.toLowerCase();
    if (await this.usersService.findByEmailWithPassword(normalizedEmail)) {
      throw new ConflictException('An account with this email already exists');
    }

    const user = await this.usersService.create({
      name,
      email: normalizedEmail,
      password: await hash(password, SALT_ROUNDS),
    });
    return { user, token: await this.sign(user) };
  }

  async login({ email, password }: LoginDto) {
    const found = await this.usersService.findByEmailWithPassword(email.toLowerCase());
    if (!found || !(await compare(password, found.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _password, ...user } = found;
    return { user, token: await this.sign(user) };
  }

  me(userId: string) {
    return this.usersService.findOne(userId);
  }

  private sign(user: { id: string; email: string }) {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return this.jwt.signAsync(payload);
  }
}
