import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  description: string;

  // In rupees, e.g. 1250.50. Converted to paisa by the service.
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  @Max(10_000_000)
  amount: number;

  @IsUUID()
  paidById: string;

  // Everyone the cost is split between (equally). May or may not include the payer.
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @IsUUID('all', { each: true })
  participantIds: string[];

  @IsOptional()
  @IsUUID()
  groupId?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;
}
