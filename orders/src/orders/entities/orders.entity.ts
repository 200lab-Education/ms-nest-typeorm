import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { OrderStatus } from '../../common/enum/order-status.enum';
import { OrderPayload } from '../../orders/dtos/order-payload.dto';
import { Payload } from './payload.entity';

@Entity()
export class Orders extends BaseEntity {
  @Column(() => Payload)
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OrderPayload)
  payload: Payload;
  @Column({ default: OrderStatus.CREATED, nullable: false })
  @IsNotEmpty({ message: 'State must be required' })
  @IsEnum(OrderStatus)
  state: OrderStatus;
}
