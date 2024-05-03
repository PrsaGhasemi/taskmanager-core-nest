import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(4000);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:4000',
    );
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      username: 'parsa',
      email: 'dummymail@gmail.com',
      password: 'pass1234',
      phoneNumber: '0123456789'
    };
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
            username: dto.username,
            phoneNumber: dto.phoneNumber
          })
          .expectStatus(400);
      });
      describe('Signup', () => {
        it('should throw if email is not email!!', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              password: dto.password,
              username: dto.username,
              phoneNumber: dto.phoneNumber
            })
            .expectStatus(400);
        });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            username: dto.username,
            email: dto.email,
            phoneNumber: dto.phoneNumber
          })
          .expectStatus(400);
      });
      
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

  
      describe('Signin', () => {
        it('should throw if email empty', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
              password: dto.password,
            })
            .expectStatus(400);
        });
        it('should throw if password empty', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
              username: dto.username
            })
            .expectStatus(400);
        });
        it('should throw if no body provided', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .expectStatus(400);
        });
        it('should signin', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody(dto)
            .expectStatus(200)
            .stores('userAt', 'access_token');
        });
      });
    });
  })
})