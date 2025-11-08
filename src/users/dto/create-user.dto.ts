import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { USER_ROLES } from 'generated/prisma';
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
  @IsOptional()
  role?: USER_ROLES;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
  @IsString()
  @IsOptional()
  refreshToken?: string;
}
