import { EVENT_EMIT } from 'src/common/const/event-emit';
import { PaymentService } from './payment.service';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { IOrder } from './interfaces/order.interface';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @EventPattern(EVENT_EMIT.CREATE_ORDER)
  async handleOrderCreated(data: IOrder) {
    this.paymentService.handlePayment(data);
  }
}
