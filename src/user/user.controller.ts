import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard, RoleGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly prisma: PrismaService) {}
  //Get the LogedIn User data
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(RoleGuard)
  @Get('all')
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }


  @Patch('edit')
  editUser() {

  }
}