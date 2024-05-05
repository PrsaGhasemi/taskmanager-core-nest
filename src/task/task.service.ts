import { PrismaService } from 'src/prisma/prisma.service';
import { Task, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto , UpdateTaskDto } from 'src/task/dto/main' 

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany({ include: { user: true } });
  }

  
  async findAllByUserId(userId: number) {
    return this.prisma.task.findMany({ where: { userId }, include: { user: true } });
  }

  async findOne(id: number) {
    return this.prisma.task.findUnique({ where: { id }, include: { user: true } });
  }
  async findOneByUserId(id: number, userId: number) {
    return this.prisma.task.findUnique({ where: { id, userId }, include: { user: true } });
  }

  
  async createTask(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const newTask = await this.prisma.task.create({
      data: {
        ... createTaskDto,
        user: { connect: { id: userId } },
      },
    });
    return newTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    return this.prisma.task.update({
      where: { id, userId },
      data: updateTaskDto,
      include: { user: true },
    });
  }

  async delete(id: number, userId: number) {
    return this.prisma.task.delete({ where: { id, userId } });
  }
}
