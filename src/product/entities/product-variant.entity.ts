import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique
} from 'typeorm';

import { Product } from './product.entity';
import { Facet } from './facet.entity';
import { ApiProperty } from '@nestjs/swagger';


export enum CurrencyCode {
    VND,
    USD,
    SGD
}

const TAX_VALUE = 0.1

export interface ProductVariantInterface {
    id: number
    name: string
    enabled: boolean
    sku: string
    price: number
    currencyCode: CurrencyCode
    priceWithTax: number
    product: Product
    productId: number
    stockOnHand: number
}

@Unique(['sku'])
@Entity()
export class ProductVariant implements ProductVariantInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({ default: true })
    enabled: boolean;

    @ApiProperty()
    @Column()
    sku: string;

    @ApiProperty()
    @Column()
    price: number;

    @ApiProperty()
    @Column()
    currencyCode: CurrencyCode;

    @ApiProperty()
    @Column()
    priceWithTax: number;

    @ManyToOne(() => Product, product => product.variants)
    product: Product;

    @ApiProperty()
    @Column({ nullable: false })
    productId: number;

    @ApiProperty()
    @Column({ default: 0 })
    stockOnHand: number;

    @ManyToMany(() => Facet)
    @JoinTable(
      {
        name: 'product_variant_facets_facet',
        joinColumn: { name: 'productVariantId', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'facetId', referencedColumnName: 'id'},
    }
    )
    facets: Facet[];

    @BeforeUpdate()
    @BeforeInsert()
    calculateTax(){
        this.priceWithTax = this.price + (this.price * TAX_VALUE);
    }
}
