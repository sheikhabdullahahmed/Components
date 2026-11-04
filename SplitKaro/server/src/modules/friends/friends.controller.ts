import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import type { JwtPayload } from '../auth/auth.constants.js';
import { AddFriendDto } from './dto/add-friend.dto.js';
import { FriendsService } from './friends.service.js';

@Controller('friends')
@UseGuards(AuthGuard)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  list(@CurrentUser() user: JwtPayload) {
    return this.friendsService.list(user.sub);
  }

  @Post()
  add(@CurrentUser() user: JwtPayload, @Body() dto: AddFriendDto) {
    return this.friendsService.add(user.sub, dto.email);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@CurrentUser() user: JwtPayload, @Param('id', ParseUUIDPipe) id: string) {
    await this.friendsService.remove(user.sub, id);
  }

  @Get('invites')
  listInvites(@CurrentUser() user: JwtPayload) {
    return this.friendsService.listInvites(user.sub);
  }

  @Delete('invites/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelInvite(@CurrentUser() user: JwtPayload, @Param('id', ParseUUIDPipe) id: string) {
    await this.friendsService.cancelInvite(user.sub, id);
  }
}
