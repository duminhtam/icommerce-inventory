import { Seeder, Factory } from 'typeorm-seeding'
import { Product } from '../../src/product/entities/product.entity'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {

    await factory(Product)({}).create()
  }
}
