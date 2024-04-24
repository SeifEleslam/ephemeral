import { IsEmail, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @Min(3)
  @Max(20)
  username: string;
}
