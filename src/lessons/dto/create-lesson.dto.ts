import { IsDateString, IsString, MinLength } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @MinLength(3)
  location: string;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @IsDateString()
  date: Date;

  @IsString()
  imageUrl: string;
}
