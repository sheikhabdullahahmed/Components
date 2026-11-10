import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { JwtPayload } from '../auth/auth.constants.js';

// Must run after AuthGuard. Admins are the emails listed in ADMIN_EMAILS (comma separated).
@Injectable()
export class AdminGuard implements CanActivate {
  private readonly admins: Set<string>;

  constructor(config: ConfigService) {
    this.admins = new Set(
      (config.get<string>('ADMIN_EMAILS') ?? '')
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    );
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<{ user?: JwtPayload }>();
    if (!req.user || !this.admins.has(req.user.email.toLowerCase())) {
      throw new ForbiddenException('Admins only');
    }
    return true;
  }
}
