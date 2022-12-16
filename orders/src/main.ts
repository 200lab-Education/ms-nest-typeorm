import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedisIoAdapter } from 'adapter/redis.adapter';
import { HttpExceptionFilter } from 'filter/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes();
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    allowedHeaders: '*',
  });
  const configService = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setBasePath('/api/v1')
    .setTitle('Orders REST API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: configService.get('REDIS_HOST'),
      port: parseInt(configService.get('REDIS_PORT')),
    },
  });
  const redisIoAdapter = new RedisIoAdapter(app, configService);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'), () => {
    console.log(`Server listen on port: ${configService.get('PORT')}`);
  });
}
bootstrap();
