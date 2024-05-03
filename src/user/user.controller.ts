import { Body, Controller, Delete, Get, Param, Patch, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard, RoleGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/service/paginator/pagination.service';
import { UpdateUserDto } from 'src/auth/dto/update.user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly paginationService: PaginationService,
    private readonly prisma: PrismaService) {}
  //Get the LogedIn User data
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(new RoleGuard('SYSTEM_ADMIN'))
  @Get('all')
  async findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<{ items: User[]; total: number }> {
    const { items, total } = await this.paginationService.paginate<User>(
      this.prisma.user,
      page,
      limit,
    );
    return { items, total };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(Number(id));
  }
  }