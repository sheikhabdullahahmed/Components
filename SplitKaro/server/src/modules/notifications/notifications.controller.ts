import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import type { JwtPayload } from '../auth/auth.constants.js';
import { ListNotificationsDto } from './dto/list-notifications.dto.js';
import { NotificationsService } from './notifications.service.js';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  list(@CurrentUser() user: JwtPayload, @Query() { cursor }: ListNotificationsDto) {
    return this.notificationsService.list(user.sub, cursor);
  }

  @Get('unread-count')
  unreadCount(@CurrentUser() user: JwtPayload) {
    return this.notificationsService.unreadCount(user.sub);
  }

  // Declared before ":id/read" so "read-all" is never parsed as an id.
  @Patch('read-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAllRead(@CurrentUser() user: JwtPayload) {
    await this.notificationsService.markAllRead(user.sub);
  }

  @Patch(':id/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markRead(@CurrentUser() user: JwtPayload, @Param('id', ParseUUIDPipe) id: string) {
    await this.notificationsService.markRead(user.sub, id);
  }
}
