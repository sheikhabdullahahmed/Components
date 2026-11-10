import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import type { JwtPayload } from '../auth/auth.constants.js';
import { AdminGuard } from './admin.guard.js';
import { AdminService } from './admin.service.js';
import { AdminListDto } from './dto/admin-list.dto.js';

// Every route here needs a logged-in user whose email is in ADMIN_EMAILS.
@Controller('admin')
@UseGuards(AuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Lets the client ask "am I an admin?": 200 for admins, 403 for everyone else.
  @Get('me')
  me() {
    return { admin: true };
  }

  @Get('overview')
  overview() {
    return this.adminService.overview();
  }

  @Get('users')
  users(@Query() query: AdminListDto) {
    return this.adminService.listUsers(query);
  }

  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@CurrentUser() admin: JwtPayload, @Param('id', ParseUUIDPipe) id: string) {
    await this.adminService.removeUser(admin.sub, id);
  }

  @Get('invites')
  invites(@Query() query: AdminListDto) {
    return this.adminService.listInvites(query);
  }

  @Delete('invites/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeInvite(@Param('id', ParseUUIDPipe) id: string) {
    await this.adminService.removeInvite(id);
  }

  @Get('expenses')
  expenses(@Query() query: AdminListDto) {
    return this.adminService.listExpenses(query);
  }

  @Delete('expenses/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeExpense(@Param('id', ParseUUIDPipe) id: string) {
    await this.adminService.removeExpense(id);
  }

  @Get('groups')
  groups(@Query() query: AdminListDto) {
    return this.adminService.listGroups(query);
  }

  @Delete('groups/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeGroup(@Param('id', ParseUUIDPipe) id: string) {
    await this.adminService.removeGroup(id);
  }
}
