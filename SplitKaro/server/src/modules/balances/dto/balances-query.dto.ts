import { IsOptional, IsUUID } from 'class-validator';

export class BalancesQueryDto {
  // Only count expenses in this group.
  @IsOptional()
  @IsUUID()
  groupId?: string;
}
