import { IsEmail } from 'class-validator';

export class AddFriendDto {
  @IsEmail()
  email: string;
}
