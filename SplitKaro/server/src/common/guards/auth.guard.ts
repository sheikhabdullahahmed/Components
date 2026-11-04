import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { AUTH_COOKIE, type JwtPayload } from '../../modules/auth/auth.constants.js';

// Verifies the JWT from the auth cookie and attaches its payload as req.user.
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
    const token: string | undefined = req.cookies?.[AUTH_COOKIE];
    if (!token) throw new UnauthorizedException('Not authenticated');

    try {
      req.user = await this.jwt.verifyAsync<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Session expired, please log in again');
    }
    return true;
  }
}
