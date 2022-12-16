import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from '../events/events.gateway';
import { Orders } from './entities/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersServices } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  controllers: [OrdersController],
  providers: [OrdersServices, EventsGateway],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
