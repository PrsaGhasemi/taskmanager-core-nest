import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
   email: string;

   //TODO Fix value checkings here
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @IsString()
    @IsNotEmpty()
   phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
   username: string;

}
