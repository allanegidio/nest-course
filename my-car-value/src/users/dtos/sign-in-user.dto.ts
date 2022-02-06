import { IsEmail, IsString } from "class-validator"

export class SignInUser {
  @IsEmail()
  email: string

  @IsString()
  password: string
}