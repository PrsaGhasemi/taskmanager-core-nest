import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserRole } from '@prisma/client';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {
  constructor(private role: UserRole) {
    super()
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.role === this.role) {
      return true;
    } else {
      throw new ForbiddenException('You dont have access to do that');
    }
  }
}
