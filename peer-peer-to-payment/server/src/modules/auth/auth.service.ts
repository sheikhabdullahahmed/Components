import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { FriendsService } from '../friends/friends.service.js';
import { UsersService } from '../users/users.service.js';
import type { JwtPayload } from './auth.constants.js';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';

const SALT_ROUNDS = 10;

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://openidconnect.googleapis.com/v1/userinfo';

type GoogleProfile = {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly friendsService: FriendsService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
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
    await this.friendsService.acceptInvites(user);
    return { user, token: await this.sign(user) };
  }

  async login({ email, password }: LoginDto) {
    const found = await this.usersService.findByEmailWithPassword(email.toLowerCase());
    if (!found?.password || !(await compare(password, found.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _password, ...user } = found;
    return { user, token: await this.sign(user) };
  }

  me(userId: string) {
    return this.usersService.findOne(userId);
  }

  googleAuthUrl(state: string) {
    const params = new URLSearchParams({
      client_id: this.config.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      redirect_uri: this.config.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      response_type: 'code',
      scope: 'openid email profile',
      state,
      prompt: 'select_account',
    });
    return `${GOOGLE_AUTH_URL}?${params}`;
  }

  async googleLogin(code: string) {
    const profile = await this.fetchGoogleProfile(code);
    if (!profile.email_verified) {
      throw new UnauthorizedException('Google email is not verified');
    }

    const user = await this.usersService.upsertGoogleUser({
      googleId: profile.sub,
      email: profile.email.toLowerCase(),
      name: profile.name,
    });
    await this.friendsService.acceptInvites(user);
    return { user, token: await this.sign(user) };
  }

  private async fetchGoogleProfile(code: string): Promise<GoogleProfile> {
    const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: this.config.getOrThrow<string>('GOOGLE_CLIENT_ID'),
        client_secret: this.config.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
        redirect_uri: this.config.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
        grant_type: 'authorization_code',
      }),
    });
    if (!tokenRes.ok) throw new UnauthorizedException('Google sign-in failed');
    const { access_token } = (await tokenRes.json()) as { access_token: string };

    const profileRes = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!profileRes.ok) throw new UnauthorizedException('Google sign-in failed');
    return (await profileRes.json()) as GoogleProfile;
  }

  private sign(user: { id: string; email: string }) {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return this.jwt.signAsync(payload);
  }
}
