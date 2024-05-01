import { Injectable } from '@nestjs/common';
@Injectable({})
export class AuthService {
  signin() {
    return 'i am signed inn';
  }
  signup() {
    return 'i am signed up';
  }
}
