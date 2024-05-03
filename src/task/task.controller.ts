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
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto , UpdateTaskDto } from 'src/task/dto/main';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Roles('SYSTEM_USER', 'SYSTEM_ADMIN')
  async findAll(@Req() req) {
    const user = req.user;
    if (user.role === 'SYSTEM_ADMIN') {
      return this.taskService.findAll();
    } else {
      return this.taskService.findAllByUserId(user.id);
    }
  }

  @Get(':id')
  @Roles('SYSTEM_USER', 'SYSTEM_ADMIN')
  async findOne(@Param('id') id: number, @Req() req) {
    const user = req.user;
    if (user.role === 'SYSTEM_ADMIN') {
      return this.taskService.findOne(id);
    } else {
      return this.taskService.findOneByUserId(id, user.id);
    }
  }

  @Post()
  @Roles('SYSTEM_USER')
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    const user = req.user;
    return this.taskService.create(createTaskDto, user.id);
  }

  @Put(':id')
  @Roles('SYSTEM_USER')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto, @Req() req) {
    const user = req.user;
    return this.taskService.update(id, updateTaskDto, user.id);
  }

  @Delete(':id')
  @Roles('SYSTEM_USER')
  @HttpCode(204)
  async delete(@Param('id') id: number, @Req() req) {
    const user = req.user;
    return this.taskService.delete(id, user.id);
  }
}
