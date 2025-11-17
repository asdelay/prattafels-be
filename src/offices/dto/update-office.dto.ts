import { PartialType } from '@nestjs/mapped-types';
import { CreateOfficeDto } from './create-office.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  address?: string;
}
