import { IsString, MinLength } from 'class-validator';

export class CreateOfficeDto {
  @IsString()
  @MinLength(2)
  imageUrl: string;

  @IsString()
  @MinLength(2)
  address: string;
}
