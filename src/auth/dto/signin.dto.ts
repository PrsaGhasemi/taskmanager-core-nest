import { IsString, MaxLength, MinLength } from 'class-validator';
import { AuthDto } from './auth.dto';

export class SigninDto implements Partial<AuthDto> {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password?: string;
}