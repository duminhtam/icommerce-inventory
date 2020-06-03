import {
  NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Inventory')

  // Build swagger docs for development
  const options = new DocumentBuilder()
    .setTitle('Inventory service')
    .setDescription('Inventory service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    disableErrorMessages: false,
  }))
  // Initialize global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Start tracking service
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url:`redis://${process.env.TRACKING_REDIS_HOST}:${process.env.TRACKING_REDIS_PORT}`,
    },
  });

  // app.useGlobalGuards(new TrackingGuard());
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: 'localhost',
  //     port: parseInt(
  //       process.env.USER_SERVICE_PORT
  //       ,10)
  //   }
  // });
  //
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: 'localhost',
  //     port: parseInt(
  //       process.env.AUTH_SERVICE_PORT
  //       ,10)
  //   }
  // });

  await app.startAllMicroservicesAsync();

  await app.listen(process.env.PORT);
  logger.log(`Service is running on http://localhost:${process.env.PORT}`);
}
bootstrap();
