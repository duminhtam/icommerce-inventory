import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export interface FacetInterface {
    id: number
    name: string
    value: string
}

@Entity()
@Index("IDX_facet_name_value", ["name", "value"], { unique: true })
export class Facet implements FacetInterface {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({comment: 'color, size, brand, weight'})
    name: string;

    @ApiProperty()
    @Column()
    value: string;
}
