import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Facet } from "../entities/facet.entity";

@Injectable()
export class FacetService extends TypeOrmCrudService<Facet> {
  constructor(@InjectRepository(Facet, 'inventoryDB') repo) {
    super(repo);
  }
}
