import { IsOptional, IsUUID } from 'class-validator';

export class ListExpensesDto {
  @IsOptional()
  @IsUUID()
  groupId?: string;

  // Only expenses shared between the current user and this friend.
  @IsOptional()
  @IsUUID()
  friendId?: string;
}
