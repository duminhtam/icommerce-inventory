import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { ProductVariant } from "../entities/product-variant.entity";

@Injectable()
export class ProductVariantService extends TypeOrmCrudService<ProductVariant> {
  constructor(@InjectRepository(ProductVariant, 'inventoryDB') repo) {
    super(repo);
  }
}
