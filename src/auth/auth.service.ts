import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin() {
    return 'i am signed inn';
  }
  signup() {
    return 'i am signed up';
  }
}
