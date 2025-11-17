import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateTeacherApplicationDto {
  @IsNumber()
  userId: number;

  @IsString()
  @MinLength(1)
  languageLevel: string;

  @IsString()
  @MinLength(1)
  motivationLetter: string;
}
