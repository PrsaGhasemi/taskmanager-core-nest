import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === 'SYSTEM_ADMIN') {
      return true;
    } else {
      throw new ForbiddenException('You dont have access to do that');
    }
  }
}
