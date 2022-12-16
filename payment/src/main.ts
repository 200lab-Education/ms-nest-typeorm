import { NestFactory } from '@nestjs/core';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<RedisOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: `${process.env.REDIS_HOST}`,
      port: parseInt(process.env.REDIS_PORT),
    },
  });
  await app.listen();
}
bootstrap();
