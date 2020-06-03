import { INestApplication, INestMicroservice } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Transport } from '@nestjs/microservices';
import { getConnection } from 'typeorm';
import { AllExceptionsFilter } from '../src/all-exceptions.filter';

describe('Inventory Service (e2e)', () => {
  let app: INestApplication;
  beforeAll(async (done) => {
    // Drop 2 DB before test
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();


    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());

    // Start tracking service
    app.connectMicroservice({
      transport: Transport.REDIS,
      options: {
        url:`redis://${process.env.TRACKING_REDIS_HOST}:${process.env.TRACKING_REDIS_PORT}`,
      },
    });
    await app.startAllMicroservicesAsync();
    await app.init();

    await getConnection('trackingDB').synchronize(true);
    await getConnection('inventoryDB').synchronize(true);

    done()
  });

  afterAll(async () => {
    await getConnection().close();
    await app.close();
  });

  describe('Product', () => {
    it('Should return status 201 after create product success', async () => {
      const payload = {
        "name": "iPhone X",
        "description": "The iPhone X is a smartphone designed, developed, and marketed by Apple Inc. It is the eleventh generation of the iPhone and was announced on September"
      };
      const data = await request(app.getHttpServer())
        .post('/user')
        .send(payload)
        .expect(201)

      expect(data.body).toEqual({
        userId: expect.any(Number),
        accessToken: expect.any(String),
      });
    });
    //
    // it('Should return status 201 after login success', async () => {
    //   const payload = {
    //     "username": "admin",
    //     "password": "a@123456!!!"
    //   };
    //   const data = await request(app.getHttpServer())
    //     .post('/auth/login')
    //     .send(payload)
    //     .expect(201)
    //
    //   expect(data.body).toEqual({
    //     userId: expect.any(Number),
    //     accessToken: expect.any(String),
    //   });
    // });
    //
    // it('Should return status 401 after login failed', async () => {
    //   const payload = {
    //     "username": "adminx",
    //     "password": "a@123456!!!xxx"
    //   };
    //   const data = await request(app.getHttpServer())
    //     .post('/auth/login')
    //     .send(payload)
    //     .expect(401)
    //
    //   expect(data.body).toEqual({
    //
    //     status: 401,
    //     error: "Unauthorized",
    //     timestamp: expect.any(String),
    //     path: "/auth/login"
    //   });
    // });
  });
  // describe('Variant', () => {
  //   it('Should return status 201 after login success', async () => {
  //     const payload = {
  //       "username": "admin",
  //       "email": "admin@gmail.com",
  //       "name": "admin",
  //       "password": "a@123456!!!"
  //     };
  //     const data = await request(app.getHttpServer())
  //       .post('/user')
  //       .send(payload)
  //       .expect(201)
  //
  //     expect(data.body).toEqual({
  //       userId: expect.any(Number),
  //       accessToken: expect.any(String),
  //     });
  //   });
  //
  //   it('Should return status 201 after login success', async () => {
  //     const payload = {
  //       "username": "admin",
  //       "password": "a@123456!!!"
  //     };
  //     const data = await request(app.getHttpServer())
  //       .post('/auth/login')
  //       .send(payload)
  //       .expect(201)
  //
  //     expect(data.body).toEqual({
  //       userId: expect.any(Number),
  //       accessToken: expect.any(String),
  //     });
  //   });
  //
  //   it('Should return status 401 after login failed', async () => {
  //     const payload = {
  //       "username": "adminx",
  //       "password": "a@123456!!!xxx"
  //     };
  //     const data = await request(app.getHttpServer())
  //       .post('/auth/login')
  //       .send(payload)
  //       .expect(401)
  //
  //     expect(data.body).toEqual({
  //
  //       status: 401,
  //       error: "Unauthorized",
  //       timestamp: expect.any(String),
  //       path: "/auth/login"
  //     });
  //   });
  // });
});
