import { Injectable } from "@nestjs/common";
import { InjectRepository, InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
  constructor(
    @InjectConnection('inventoryDB') private inventoryConnection: Connection,
    @InjectRepository(Product, 'inventoryDB') repo

  ) {
    super(repo);
  }

  async productAddFacet(productId: number, facetId: number): Promise<object> {
    await this.inventoryConnection.createQueryBuilder()
      .relation(Product, "facets")
      .of(productId)
      .add(facetId);

    return {
      message: `FacetId ${facetId} was added to ${productId} successfully`,
    };
  }
}
