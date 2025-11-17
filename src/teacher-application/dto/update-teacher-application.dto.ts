import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTeacherApplicationDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  languageLevel?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  motivationLetter?: string;
}
