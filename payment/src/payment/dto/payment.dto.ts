import { PaymentStatus } from 'src/common/enum/payment-status.enum';

export class PaymentDTO {
  readonly id: string;
  state: PaymentStatus;
  timestamp: Date;
  constructor(id: string, state: PaymentStatus) {
    this.id = id;
    this.state = state;
    this.timestamp = new Date();
  }
}
