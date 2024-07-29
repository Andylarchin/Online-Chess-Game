import { IsNotEmpty, IsString } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;
  

  @IsString()
  @IsNotEmpty()
  Bio: string;

  @IsString()
  @IsNotEmpty()
  Rank: string;

  @IsString()
  @IsNotEmpty()
  ImageURL: string;
}
