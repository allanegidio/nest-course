import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import supertest from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    request = supertest(app.getHttpServer())
  });

  it('/ (GET)', async () => {
    const response = await request.get('/')

    expect(response.statusCode).toBe(HttpStatus.OK)
    expect(response.text).toBe('Hello World!')
  });
});
