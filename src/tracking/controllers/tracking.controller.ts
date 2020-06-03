import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { TrackingService } from '../services/tracking.service';


@Controller()
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService
  ) {}

  // Use for other service validate token
  @MessagePattern({ service: 'tracking', cmd: 'addEvent'})
  async addEvent(data) {
    try {
      await this.trackingService.addEvent(data);
      Logger.debug(data, 'TrackingController.addEvent')
    } catch(e) {
      Logger.error(e);
    }
  }
}
