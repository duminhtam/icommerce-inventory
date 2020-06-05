import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Connection } from 'typeorm';

import { ProductVariant } from "../entities/product-variant.entity";

@Injectable()
export class ProductVariantService extends TypeOrmCrudService<ProductVariant> {
  constructor(
    @InjectConnection('inventoryDB') private inventoryConnection: Connection,
    @InjectRepository(ProductVariant, 'inventoryDB') repo
  ) {
    super(repo);
  }

  async productVariantAddFacet(productVariantId: number, facetId: number): Promise<object> {
    await this.inventoryConnection.createQueryBuilder()
      .relation(ProductVariant, "facets").of(productVariantId).add(facetId);

    return {
      message: `FacetId ${facetId} was added to productVariantId ${productVariantId} successfully`,
    };
  }
}
