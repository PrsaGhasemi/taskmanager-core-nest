import { PaginationService } from 'src/service/paginator/pagination.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  HttpCode,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto , UpdateTaskDto } from 'src/task/dto/main';
import { JwtGuard, RoleGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { Task, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService,
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  @Get('all')
  @UseGuards(new RoleGuard('SYSTEM_ADMIN'))
  async findAll(@Query('page') page: number, @Query('limit') limit: number, @GetUser() user : User): Promise<{ items: Task[]; total: number }>  {
        const { items, total } = await this.paginationService.paginate<Task>(
          this.prisma.user,
          page,
          limit,
        );
        return { items, total };
    }

    
  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req) {
    const user = req.user;
    if (user.role === 'SYSTEM_ADMIN') {
      return this.taskService.findOne(Number(id));
    } else {
      return this.taskService.findOneByUserId(Number(id), user.id);
    }
  }

  @Post('create')
  async create(@GetUser() user: User, @Body() createTaskDto: CreateTaskDto,) {
    return this.taskService.createTask(createTaskDto,user.id)
    }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto, @Req() req) {
    const user = req.user;
    return this.taskService.update(id, updateTaskDto, user.id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number, @Req() req) {
    const user = req.user;
    return this.taskService.delete(id, user.id);
  }
}
