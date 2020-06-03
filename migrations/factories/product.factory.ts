import * as Faker from 'faker'
import { define } from 'typeorm-seeding'
import { Product } from '../../src/product/entities/product.entity'

define(Product, (faker: typeof Faker, data: any) => {
  const name = data.name ? data.name : faker.name.firstName()
  // const username = name === 'admin' ? 'admin' : faker.internet.userName(name).toLowerCase()
  // const email = faker.internet.email(username)

  const product = new Product()
  product.name = name
  // user.name = name
  // user.username = username
  // user.email = email
  // user.password = 'a@123456!!!'
  return product
})
