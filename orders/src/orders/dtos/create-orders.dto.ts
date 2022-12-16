import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { OrderPayload } from './order-payload.dto';
export class CreateOrderDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => OrderPayload)
  @ApiProperty()
  readonly payload: OrderPayload;
}
