import { randomBytes } from 'node:crypto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Request, Response } from 'express';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { AUTH_COOKIE, OAUTH_STATE_COOKIE, type JwtPayload } from './auth.constants.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const TEN_MINUTES_MS = 10 * 60 * 1000;

@Controller('auth')
export class AuthController {
  private readonly cookieOptions: CookieOptions;
  private readonly clientUrl: string;

  constructor(
    private readonly authService: AuthService,
    config: ConfigService,
  ) {
    this.clientUrl = config.getOrThrow<string>('CLIENT_URL');
    this.cookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: config.get<string>('NODE_ENV') === 'production',
      path: '/',
    };
  }

  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.authService.signup(dto);
    res.cookie(AUTH_COOKIE, token, { ...this.cookieOptions, maxAge: SEVEN_DAYS_MS });
    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.authService.login(dto);
    res.cookie(AUTH_COOKIE, token, { ...this.cookieOptions, maxAge: SEVEN_DAYS_MS });
    return user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(AUTH_COOKIE, this.cookieOptions);
  }

  @Get('google')
  google(@Res() res: Response) {
    // Random state ties the callback to this browser and blocks CSRF logins.
    const state = randomBytes(16).toString('hex');
    res.cookie(OAUTH_STATE_COOKIE, state, { ...this.cookieOptions, maxAge: TEN_MINUTES_MS });
    res.redirect(this.authService.googleAuthUrl(state));
  }

  @Get('callback/google')
  async googleCallback(
    @Query('code') code: string | undefined,
    @Query('state') state: string | undefined,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const expectedState = (req.cookies as Record<string, string | undefined>)[OAUTH_STATE_COOKIE];
    res.clearCookie(OAUTH_STATE_COOKIE, this.cookieOptions);
    const failureUrl = `${this.clientUrl}/login?error=google`;

    if (!code || !state || state !== expectedState) return res.redirect(failureUrl);

    try {
      const { token } = await this.authService.googleLogin(code);
      res.cookie(AUTH_COOKIE, token, { ...this.cookieOptions, maxAge: SEVEN_DAYS_MS });
      res.redirect(`${this.clientUrl}/dashboard`);
    } catch {
      res.redirect(failureUrl);
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@CurrentUser() user: JwtPayload) {
    return this.authService.me(user.sub);
  }
}
