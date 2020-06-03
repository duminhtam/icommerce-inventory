import {
  Column, Entity, JoinTable, ManyToMany,
  OneToMany, PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';
import { SlugService } from '@app/slug';

import { ProductVariant } from './product-variant.entity';
import { Facet } from './facet.entity';

export interface ProductInterface {
  id: number
  name: string
  slug: string
  description: string
  enabled: boolean
  variants: ProductVariant[]
}


/**
 * @description
 * A Product contains one or more {@link ProductVariant}s and serves as a container for those variants,
 * providing an overall name, description etc.
 *
 * @docsCategory entities
 */

@Entity()
export class Product implements ProductInterface{
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Column()
  slug: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @Column({ default: true })
  enabled: boolean;

  @ApiProperty()
  @OneToMany(() => ProductVariant, (variant) => variant.product)
  @JoinTable()
  variants: ProductVariant[];

  @ApiProperty()
  @ManyToMany(() => Facet)
  @JoinTable({
    name: 'product_facets_facet',
    joinColumn: { name: 'productId', referencedColumnName: 'id'},
    inverseJoinColumn: { name: 'facetId', referencedColumnName: 'id'},
  })
  facets: Facet[];

  @BeforeInsert()
  @BeforeUpdate()
  async createSlug() {
    this.slug = SlugService.createSlug(this.name)
  }
}
