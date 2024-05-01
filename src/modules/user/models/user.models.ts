import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @MinLength(3)
  @MaxLength(20)
  username: string;
}

export class PatchUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @MinLength(3)
  @MaxLength(20)
  @IsOptional()
  username?: string;
}
