import { IsDateString, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  description: string;

  @IsNumber()
  locationId: number;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @IsDateString()
  date: Date;
}
