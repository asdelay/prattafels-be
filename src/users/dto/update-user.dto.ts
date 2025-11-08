import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { USER_ROLES } from 'generated/prisma';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(32)
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  role?: USER_ROLES;

  @IsBoolean()
  @IsOptional()
  wantsNotifications?: boolean;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
  @IsString()
  @IsOptional()
  refreshToken?: string;
}
