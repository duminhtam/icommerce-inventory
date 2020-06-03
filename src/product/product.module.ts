import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { Facet } from './entities/facet.entity';

import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { ProductVariantService } from './services/product-variant.service';
import { ProductVariantController } from './controllers/product-variant.controller';
import { FacetController } from './controllers/facet.controller';
import { FacetService } from './services/facet.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductVariant, Facet], 'inventoryDB'),
    ClientsModule.register([{
      name: 'TRACKING_SERVICE',
      transport: Transport.REDIS,
      options: {
        url:`redis://${process.env.TRACKING_REDIS_HOST}:${process.env.TRACKING_REDIS_PORT}`,
      },
    }])
  ],
  exports: [ProductService, ProductVariantService, FacetService],
  providers: [ProductService, ProductVariantService, FacetService],
  controllers: [ProductController, ProductVariantController, FacetController],
})
export class ProductModule {}
