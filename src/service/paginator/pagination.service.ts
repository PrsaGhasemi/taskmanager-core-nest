import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaginationService {
  constructor(private readonly prisma: PrismaService) {}

  async paginate<T>(
    model: any,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ items: T[]; total: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const itemsPromise = model.findMany({
      skip,
      take,
    });

    const totalPromise = model.count();

    const [items, total] = await Promise.all([itemsPromise, totalPromise]);

    return { items, total };
  }
}
