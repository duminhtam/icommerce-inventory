import { Injectable, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';

import { Tracking } from '../entities/tracking.entity'

@Injectable()
export class TrackingService {
  constructor(
  @InjectRepository(Tracking, 'trackingDB')
  private readonly trackingRepository: Repository<Tracking>
  ) {}

  async addEvent(tracking: Tracking): Promise<InsertResult> {
    Logger.log(tracking, 'TrackingService')
    const userEntity: Tracking = this.trackingRepository.create(tracking);
    return await this.trackingRepository.insert(userEntity);
  }

}
