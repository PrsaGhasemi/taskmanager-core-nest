import { Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard, RoleGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/service/paginator/pagination.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly paginationService: PaginationService,
    private readonly prisma: PrismaService) {}
  //Get the LogedIn User data
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(RoleGuard)
  @Get('all')
  async findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<{ items: User[]; total: number }> {
    const { items, total } = await this.paginationService.paginate<User>(
      this.prisma.user,
      page,
      limit,
    );
    return { items, total };
  }

  @Patch('edit')
  editUser() {

  }
}