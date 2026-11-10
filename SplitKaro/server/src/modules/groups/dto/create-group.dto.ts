import { ArrayMaxSize, IsArray, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  // Friends to add alongside the creator.
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsUUID('all', { each: true })
  memberIds?: string[];
}
