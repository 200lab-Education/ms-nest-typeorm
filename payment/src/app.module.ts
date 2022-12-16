import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from './database/database.module';
import { PaymentModule } from './payment/payment.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ClientsModule.register([
      {
        name: 'PAYMENT_PROCESS',
        transport: Transport.REDIS,
      },
    ]),
    DatabaseModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
