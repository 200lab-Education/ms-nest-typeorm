import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  EventPattern,
  Transport,
} from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { EVENT_EMIT } from 'src/common/const/event-emit';
import { PaymentStatus } from 'src/common/enum/payment-status.enum';
import { Repository } from 'typeorm';
import { PaymentDTO } from './dto/payment.dto';
import { Payment } from './entity/payment.entity';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class PaymentService {
  private clientProxy: ClientProxy;
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private configService: ConfigService,
  ) {
    this.clientProxy = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: this.configService.get('REDIS_HOST'),
        port: parseInt(this.configService.get('REDIS_PORT')),
      },
    });
  }

  randomStates<T>(anEnum: T): T[keyof T] {
    const states = Object.values(anEnum);
    const indexStates = Math.floor(Math.random() * states.length);
    return states[indexStates];
  }

  processPayment(order: IOrder): Promise<Payment> {
    const state = this.randomStates(PaymentStatus);
    const payment = new PaymentDTO(order.id, state);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.paymentRepository.save(payment));
      }, parseInt(this.configService.get('DELIVERY_TIMEOUT')));
    });
  }

  handlePayment(order: IOrder) {
    this.processPayment(order).then((payment: Payment) => {
      switch (payment.state) {
        case PaymentStatus.CONFIRMED:
          return this.clientProxy.emit(EVENT_EMIT.PAYMENT_CONFIRMED, payment);
        case PaymentStatus.DECLINED:
          return this.clientProxy.emit(EVENT_EMIT.PAYMENT_DECLINED, payment);
      }
    });
  }

  handleCancelProcess() {
    this.clientProxy.close();
  }
}
