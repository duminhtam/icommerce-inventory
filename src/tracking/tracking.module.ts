import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingService } from "./services/tracking.service";
import { TrackingController } from "./controllers/tracking.controller";
import { Tracking } from './entities/tracking.entity';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tracking], 'trackingDB'),
  ],
  controllers: [TrackingController],
  providers: [
    TrackingService
  ]
})
export class TrackingModule {}
