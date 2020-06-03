import { Controller } from '@nestjs/common';

import { ProductVariant } from '../entities/product-variant.entity';
import { ProductVariantService } from '../services/product-variant.service';
import { Crud, CrudController } from "@nestjsx/crud";


@Crud({
  model: {
    type: ProductVariant,
  },
  query: {
    join: {
      product: {
        eager: true,
      },
      facets: {
        eager: true,
      },
    },
  },
})
@Controller('variant')
export class ProductVariantController implements CrudController<ProductVariant> {
  constructor(public service: ProductVariantService) {}
}
