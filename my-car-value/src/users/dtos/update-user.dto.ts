import { IsEmail, IsOptional, IsString } from "class-validator"

export class UpdateUserDTO {

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string

  @IsString()
  @IsOptional()
  password: string
}