import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(32)
  password: string;
}
