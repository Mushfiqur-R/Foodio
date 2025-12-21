// src/admin/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  address: string;


}
