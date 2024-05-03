import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PaginationService } from 'src/service/paginator/pagination.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PaginationService]
})
export class UserModule {}
