import { INestApplication } from '@nestjs/common';
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

  describe('Create Product', () => {
    it('Should return status 201 after create a product successfully (iPhone X)', async () => {
      const payload = {
        "name": "iPhone X",
        "description": "The iPhone X is a smartphone designed, developed, and marketed by Apple Inc. It is the eleventh generation of the iPhone and was announced on September"
      };
      const data = await request(app.getHttpServer())
        .post('/product')
        .send(payload)
        .expect(201)

      expect(data.body).toEqual({
        "id": 1,
        "name": "iPhone X",
        "slug": "iphone-x",
        "description": "The iPhone X is a smartphone designed, developed, and marketed by Apple Inc. It is the eleventh generation of the iPhone and was announced on September",
        "enabled": true,
        "variants": [],
        "facets": [],
      });
    });

    it('Should return status 201 after create a product successfully (Samsung S10)', async () => {
      const payload = {
        "name": "Samsung S10",
        "description": "Samsung Galaxy S10 is a line of Android-based smartphones manufactured, released and marketed by Samsung Electronics as part of the Samsung Galaxy"
      };
      const data = await request(app.getHttpServer())
        .post('/product')
        .send(payload)
        .expect(201)

      expect(data.body).toEqual({
        "id": 2,
        "name": "Samsung S10",
        "slug": "samsung-s10",
        "description": "Samsung Galaxy S10 is a line of Android-based smartphones manufactured, released and marketed by Samsung Electronics as part of the Samsung Galaxy",
        "enabled": true,
        "variants": [],
        "facets": [],
      });
    });
  });

  describe('Create Variant', () => {
    it('Should return status 201 after create a variant successfully (iPhone)', async () => {
      const payload = {
        "sku": "IPXE64GWHITE",
        "name": "iPhone X 64gb White",
        "price": 1000,
        "currencyCode": 1,
        "description": "The iPhone X is a smartphone designed, developed, and marketed by Apple Inc. It is the eleventh generation of the iPhone and was announced on September",
        "productId": 1
      };
      const data = await request(app.getHttpServer())
        .post('/variant')
        .send(payload)
        .expect(201)

      expect(data.body.name).toEqual('iPhone X 64gb White');
    });


    it('Should return status 201 after create a variant successfully (SSS10)', async () => {
      const payload = {
        "sku": "SSS10BLK",
        "name": "Samsung S10 Black",
        "price": 500,
        "currencyCode": 1,
        "description": "Samsung Galaxy S10 is a line of Android-based smartphones manufactured, released and marketed by Samsung Electronics as part of the Samsung Galaxy",
        "productId": 2
      };
      const data = await request(app.getHttpServer())
        .post('/variant')
        .send(payload)
        .expect(201)

      expect(data.body.name).toEqual('Samsung S10 Black');
    });
  });

  describe('Create Facet', () => {
    it('Should return status 201 after create a facet successfully (brand:Apple)', async () => {
      const payload = {
        "name": "brand",
        "value": "Apple"
      };
      const data = await request(app.getHttpServer())
        .post('/facet')
        .send(payload)
        .expect(201)

      expect(data.body.name).toEqual('brand');
      expect(data.body.value).toEqual('Apple');
    });

    it('Should return status 201 after create a facet successfully (brand:Samsung)', async () => {
      const payload = {
        "name": "brand",
        "value": "Samsung"
      };
      const data = await request(app.getHttpServer())
        .post('/facet')
        .send(payload)
        .expect(201)

      expect(data.body.name).toEqual('brand');
      expect(data.body.value).toEqual('Samsung');
    });


    it('Should return status 201 after create a facet successfully (color:white)', async () => {
      const payload = {
        "name": "color",
        "value": "white"
      };
      const data = await request(app.getHttpServer())
        .post('/facet')
        .send(payload)
        .expect(201)

      expect(data.body.name).toEqual('color');
      expect(data.body.value).toEqual('white');
    });

    it('Should return status 201 after create a facet successfully (color:black)', async () => {
      const payload = {
        "name": "color",
        "value": "black"
      };
      const data = await request(app.getHttpServer())
        .post('/facet')
        .send(payload)
        .expect(201)

      expect(data.body.name).toEqual('color');
      expect(data.body.value).toEqual('black');
    });
  });


  describe('Add Facet to Product', () => {
    it('Should return status 201 after create a facet to Product successfully (add brand Apple to iPhone X)', async () => {
      await request(app.getHttpServer())
        .post('/product/1/facet/1')
        .expect(201)
    });

    it('Should return status 201 after create a facet to Product successfully (add brand Samsung to Galaxy S10)', async () => {
      await request(app.getHttpServer())
        .post('/product/2/facet/2')
        .expect(201)
    });
  });

  describe('Add Facet to Product Variant', () => {
    it('Should return status 201 after add a facet to Product Variant successfully (add color white to iPhone X 64gb White)', async () => {
      await request(app.getHttpServer())
        .post('/variant/1/facet/3')
        .expect(201)
    });

    it('Should return status 201 after add a facet to Product Variant successfully (add color black to Samsung S10 Black)', async () => {
      await request(app.getHttpServer())
        .post('/variant/2/facet/4')
        .expect(201)
    });
  });


  describe('Search Product', () => {
    it('Should return status 200 after search product have facet band:samsung', async () => {
      const data = await request(app.getHttpServer())
        .get('/product')
        .query({
          s: `{"$and":[{"facets.name":  {"$contL": "brand" }}, {"facets.value":  {"$contL": "samsung" }} ]}`
        })
        .expect(200)

      expect(data.body[0].name).toEqual('Samsung S10');
    });

    it('Should return status 200 after search product have facet band:apple', async () => {
      const data = await request(app.getHttpServer())
        .get('/product')
        .query({
          s: `{"$and":[{"facets.name":  {"$contL": "brand" }}, {"facets.value":  {"$contL": "apple" }} ]}`
        })
        .expect(200)

      expect(data.body[0].name).toEqual('iPhone X');
    });
  });

  describe('Search Product Variant', () => {
    it('Should return status 200 after search product variant have facet color:black', async () => {
      const data = await request(app.getHttpServer())
        .get('/variant')
        .query({
          s: `{"$and":[{"facets.name":  {"$contL": "color" }}, {"facets.value":  {"$contL": "black" }} ]}`
        })
        .expect(200)

      expect(data.body[0].name).toEqual('Samsung S10 Black');
    });

    it('Should return status 200 after search product have facet color:white', async () => {
      const data = await request(app.getHttpServer())
        .get('/variant')
        .query({
          s: `{"$and":[{"facets.name":  {"$contL": "color" }}, {"facets.value":  {"$contL": "white" }} ]}`
        })
        .expect(200)

      expect(data.body[0].name).toEqual('iPhone X 64gb White');
    });
  });
  // Comment it to enable Postman test
  // describe('Delete Product should delete variant', () => {
  //   it('Should return status 200 after delete a product successfully', async () => {
  //     await request(app.getHttpServer())
  //       .delete('/product/1')
  //       .expect(200)
  //
  //   });
  // });

});
