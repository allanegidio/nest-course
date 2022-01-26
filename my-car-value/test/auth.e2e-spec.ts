import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersModule } from '../src/users/users.module';

describe('Authentication Test - (e2e)', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    request = supertest(app.getHttpServer())
  });

  it('should handles a singup request',  async () => {
    const response = await request.post('/auth/signup')
                            .send({ email: 'allan.egidio@outlook.com', password: 'Contract me!' })

    const { id, email } = response.body
    
    expect(response.statusCode).toBe(200)
    expect(id).toBeDefined()
    expect(email).toBeDefined()
  });
});
