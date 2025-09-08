import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(32)
  password: string;

  @IsString()
  role: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
  @IsString()
  @IsOptional()
  refreshToken?: string;
}
