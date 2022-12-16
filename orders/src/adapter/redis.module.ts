import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RedisIoAdapter } from './redis.adapter';

@Module({
  providers: [RedisIoAdapter, ConfigService],
})
export class RedisModule {}
