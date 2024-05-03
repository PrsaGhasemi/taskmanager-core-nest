import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  
  //Get the LogedIn User data
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('edit')
  editUser() {

  }
}