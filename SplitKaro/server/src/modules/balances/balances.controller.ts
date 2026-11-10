import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import type { JwtPayload } from '../auth/auth.constants.js';
import { BalancesQueryDto } from './dto/balances-query.dto.js';
import { BalancesService } from './balances.service.js';

@Controller('balances')
@UseGuards(AuthGuard)
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  get(@CurrentUser() user: JwtPayload, @Query() query: BalancesQueryDto) {
    return this.balancesService.forUser(user.sub, query.groupId);
  }
}
