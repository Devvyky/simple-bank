import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  full_name: string;

  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
