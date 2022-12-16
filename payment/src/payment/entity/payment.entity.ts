import { PaymentStatus } from 'src/common/enum/payment-status.enum';
import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly paymentId: string;
  @Column({ nullable: false })
  readonly id: string;
  @Column({ nullable: false })
  state: PaymentStatus;
  @Column()
  timestamp: Date;
}
