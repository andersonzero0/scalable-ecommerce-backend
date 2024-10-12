import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserInputDTO {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UpdateUserInputDTO extends PartialType(CreateUserInputDTO) {}
