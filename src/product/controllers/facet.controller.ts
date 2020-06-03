import { Controller } from '@nestjs/common';

import { Facet } from '../entities/facet.entity';
import { FacetService } from '../services/facet.service';
import { Crud, CrudController } from "@nestjsx/crud";


@Crud({
  model: {
    type: Facet,
  },
})
@Controller('facet')
export class FacetController implements CrudController<Facet> {
  constructor(public service: FacetService) {}
}
