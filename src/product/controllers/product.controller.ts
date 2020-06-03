import { Controller, UseGuards } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { Crud, CrudController } from "@nestjsx/crud";
import { TrackingGuard } from "../guards/tracking.guard";

@Crud({
  model: {
    type: Product,
  },
  query: {
    join: {
      variants: {
        eager: true,
      },
      facets: {
        eager: true,
      },
      /**
       * @description show the variants.facets
       */
      'variants.facets': {
        // add alias to avoid error: table name \"facets\" specified more than once
        alias: 'vf',
        eager: true,
      },
    },
  },
})

@Controller('product')
@UseGuards(TrackingGuard)
export class ProductController implements CrudController<Product> {
  constructor(public service: ProductService) {}
}
