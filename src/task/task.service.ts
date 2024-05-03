import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: { ...createTaskDto, userId },
      include: { user: true },
    });
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
