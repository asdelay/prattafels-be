import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { type User } from 'generated/prisma';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  locationId?: number;

  @IsOptional()
  @IsDateString()
  startTime?: Date;

  @IsOptional()
  @IsDateString()
  endTime?: Date;

  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  attendeeId: number;
}
