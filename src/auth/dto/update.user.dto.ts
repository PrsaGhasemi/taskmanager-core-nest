import { IsString, IsOptional } from 'class-validator';
import { AuthDto } from './auth.dto';

export class UpdateUserDto implements Partial <AuthDto> {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

}