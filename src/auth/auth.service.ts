import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SigninDto } from './dto/signin.dto';
import { UserRole } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username 
      }
    })
    if(!user) {
      throw new ForbiddenException(
        'Invalid data'
      )
    }
    //TODO generate proper error thrower helper
    const passwordValidated = argon.verify(user.password, dto.password)
    if(!passwordValidated) {
      throw new ForbiddenException(
        'Invalid data'
      )
    }
    return this.signToken(user.id, user.email, user.role);
  }
  async signup(dto: AuthDto) {
    try {const hash = await argon.hash(dto.password)
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          phoneNumber: dto.phoneNumber,
          role: 'SYSTEM_USER',
          password: hash,
        }
      })
    return this.signToken(user.id, user.email, user.role);
  } 
    catch(error) {
      if(error instanceof PrismaClientKnownRequestError) {
        if(error.code === 'P2002') {
          throw new ForbiddenException(
            'There is problem in validating data'
          )
        }
        throw error
      }
    }
  }

  async signToken(userId: number , email: string, role: string): Promise<{access_token: string}> {
    const payload = {
      sub: userId,
      email,
      role
    }
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '90m',
      secret: this.config.get('JWT_SECRET')
    }) 
    return {
      access_token: token
    }   
  }
  
}
