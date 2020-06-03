import {
  Column, Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export interface TrackingInterface {
  id: number
  userId: string
  fingerprint: string
  event: string
  payload: object
}

@Entity()
export class Tracking implements TrackingInterface{
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @todo For later use when parse user logged in JWT token
   */
  @ApiProperty()
  @Column({ nullable: true })
  // @IsNotEmpty()
  userId: string;

  /**
   * @todo should be a deviceID or Browser Agent hash
   */
  @ApiProperty()
  @Column({ nullable: true })
  fingerprint: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  event: string;

  @CreateDateColumn()
  createdAt: Date;

  /**
   * @description hstore data type for storing sets of key/value pairs
   * within a single PostgreSQL value
   */
  @ApiProperty()
  @Column('hstore')
  payload: object;
}
