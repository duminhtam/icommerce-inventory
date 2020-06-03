import { Controller } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { CrudController } from "@nestjsx/crud";

@Controller('search')
export class ProductController implements CrudController<Product> {
  constructor(public service: ProductService) {}
}
