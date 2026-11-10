import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import type { JwtPayload } from '../auth/auth.constants.js';
import { AddMemberDto } from './dto/add-member.dto.js';
import { CreateGroupDto } from './dto/create-group.dto.js';
import { UpdateGroupDto } from './dto/update-group.dto.js';
import { GroupsService } from './groups.service.js';

@Controller('groups')
@UseGuards(AuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  list(@CurrentUser() user: JwtPayload) {
    return this.groupsService.list(user.sub);
  }

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateGroupDto) {
    return this.groupsService.create(user.sub, dto);
  }

  @Get(':id')
  findOne(@CurrentUser() user: JwtPayload, @Param('id', ParseUUIDPipe) id: string) {
    return this.groupsService.findOne(user.sub, id);
  }

  @Patch(':id')
  rename(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.groupsService.rename(user.sub, id, dto.name);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@CurrentUser() user: JwtPayload, @Param('id', ParseUUIDPipe) id: string) {
    await this.groupsService.remove(user.sub, id);
  }

  @Post(':id/members')
  addMember(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddMemberDto,
  ) {
    return this.groupsService.addMember(user.sub, id, dto.userId);
  }

  @Delete(':id/members/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeMember(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseUUIDPipe) id: string,
    @Param('userId', ParseUUIDPipe) memberId: string,
  ) {
    await this.groupsService.removeMember(user.sub, id, memberId);
  }
}
