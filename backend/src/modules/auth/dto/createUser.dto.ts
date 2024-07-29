import { IsString, IsNotEmpty } from 'class-validator';


export class createUserDto {
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
  bio: string;

  @IsString()
  @IsNotEmpty()
  rank: string;

  @IsString()
  @IsNotEmpty()
  imageURL: string;
}
