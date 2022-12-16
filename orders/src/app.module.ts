import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsModule } from './events/events.module';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EventsModule,
    ClientsModule.register([
      {
        name: 'ORDER_CREATED',
        transport: Transport.REDIS,
      },
    ]),
    DatabaseModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
