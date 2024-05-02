import { IsEmail, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class AuthDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
   email: string;

   //TODO Fix value checkings here
    @IsString()
    @IsNotEmpty()
    // @Min(8)
   password: string;

    @IsString()
    @IsNotEmpty()
   phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    // @Min(6)
    // @Max(20)
   username: string;

}
