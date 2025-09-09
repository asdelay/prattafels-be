import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @IsString()
  @MinLength(3)
  @IsOptional()
  location?: string;

  @IsOptional()
  @IsDateString()
  startTime?: Date;

  @IsOptional()
  @IsDateString()
  endTime?: Date;

  @IsOptional()
  @IsDateString()
  date?: Date;
}
