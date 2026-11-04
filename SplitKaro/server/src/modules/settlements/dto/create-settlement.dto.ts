import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';

export class CreateSettlementDto {
  // Who handed over the money.
  @IsUUID()
  payerId: string;

  // Who received it.
  @IsUUID()
  payeeId: string;

  // In rupees. Converted to paisa by the service.
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(10_000_000)
  amount: number;

  @IsOptional()
  @IsUUID()
  groupId?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;
}
