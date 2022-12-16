import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../common/enum/order-status.enum';
import { OrderPayload } from './order-payload.dto';

export class ResponseOrderDto {
  @ApiProperty({ example: 1 })
  readonly id: string;

  @ApiProperty({ example: '2018-10-18T12:41:40.423Z' })
  readonly createdAt: Date;

  @ApiProperty({ example: '2018-10-18T12:41:40.423Z' })
  readonly updatedAt: Date;

  @ApiProperty()
  readonly payload: OrderPayload;

  @ApiProperty({
    example: `'${OrderStatus.CREATED}' | '${OrderStatus.CONFIRMED}' | '${OrderStatus.CANCELLED}' | '${OrderStatus.DELIVERED}'`,
  })
  readonly state: OrderStatus;
}
