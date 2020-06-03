import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { ProductVariant } from './product/entities/product-variant.entity';
import { Facet } from './product/entities/facet.entity';
import { Tracking } from './tracking/entities/tracking.entity';
import { TrackingModule } from './tracking/tracking.module';
import { ProductModule } from './product/product.module';
import { SlugModule } from '@app/slug';
import 'dotenv/config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    name: 'inventoryDB',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.NODE_ENV !== 'production', // Auto migrate the db structure
    entities: [Product, ProductVariant, Facet]
  }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      name: 'trackingDB',
      host: process.env.TRACKING_POSTGRES_HOST,
      port: parseInt(process.env.TRACKING_POSTGRES_PORT, 10),
      username: process.env.TRACKING_POSTGRES_USER,
      password: process.env.TRACKING_POSTGRES_PASSWORD,
      database: process.env.TRACKING_POSTGRES_DB,
      synchronize: process.env.NODE_ENV !== 'production', // Auto migrate the db structure
      entities: [Tracking]
    }),
    ProductModule, TrackingModule, SlugModule,
    // AuthModule
  ],
})
export class AppModule { }
