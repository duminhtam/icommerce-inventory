import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from "./services/auth.service";
// import { JwtStrategy } from "./strategies/jwt.strategy";
// import { LocalStrategy } from "./strategies/local.strategy";
import { TrackingService } from "./services/tracking.service";
import { TrackingController } from "./controllers/tracking.controller";
import { Tracking } from './entities/tracking.entity';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tracking], 'trackingDB'),
  //   ClientsModule.register([{
  //   name: 'TRACKING_SERVICE',
  //   transport: Transport.TCP,
  //   options: {
  //     host: 'localhost',
  //     port: 9000
  //   }
  // }])
    // , JwtModule.register({
  //   secret: process.env.JWT_SECRET,
  //   signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
  // })
  ],
  controllers: [TrackingController],
  providers: [
    TrackingService
    // AuthService, LocalStrategy, JwtStrategy
  ]
})
export class TrackingModule {}
