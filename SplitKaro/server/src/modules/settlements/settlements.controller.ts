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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import type { JwtPayload } from '../auth/auth.constants.js';
import { ListExpensesDto } from '../expenses/dto/list-expenses.dto.js';
import { CreateSettlementDto } from './dto/create-settlement.dto.js';
import { SettlementsService } from './settlements.service.js';

@Controller('settlements')
@UseGuards(AuthGuard)
export class SettlementsController {
  constructor(private readonly settlementsService: SettlementsService) {}

  // Same groupId/friendId filters as expenses.
  @Get()
  list(@CurrentUser() user: JwtPayload, @Query() query: ListExpensesDto) {
    return this.settlementsService.list(user.sub, query);
  }

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateSettlementDto) {
    return this.settlementsService.create(user.sub, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@CurrentUser() user: JwtPayload, @Param('id', ParseUUIDPipe) id: string) {
    await this.settlementsService.remove(user.sub, id);
  }
}
