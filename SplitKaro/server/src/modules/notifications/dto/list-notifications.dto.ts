import { IsOptional, IsUUID } from 'class-validator';

export class ListNotificationsDto {
  @IsOptional()
  @IsUUID()
  cursor?: string;
}
