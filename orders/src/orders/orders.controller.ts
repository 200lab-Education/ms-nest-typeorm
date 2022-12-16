import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { EVENT_EMIT } from '../common/const/event-emit';
import { IPayment } from '../common/interface/payment.interface';

import { CreateOrderDto } from './dtos/create-orders.dto';
import { ResponseOrderDto } from './dtos/response-order.dto';
import { Orders } from './entities/orders.entity';
import { OrdersServices } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(private orderService: OrdersServices) {}

  @Post()
  @ApiOperation({ description: 'Create new order' })
  @ApiResponse({ status: 200, type: ResponseOrderDto })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    type: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Server error',
    type: 'Server error',
  })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Orders> {
    return this.orderService.create(createOrderDto);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Cancel order by id' })
  @ApiResponse({ status: 204, type: ResponseOrderDto })
  @ApiParam({
    name: 'id',
    description: 'Order id',
    required: true,
    type: '',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. Order Id must be required',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  async cancel(@Param('id', ParseUUIDPipe) id: string): Promise<Orders> {
    return this.orderService.cancelById(id);
  }

  @Get(':id')
  @ApiOperation({ description: 'Get order by id' })
  @ApiResponse({ status: 200, type: ResponseOrderDto })
  @ApiParam({
    name: 'id',
    description: 'Order id',
    required: true,
    type: '',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. Order Id must be required',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  async fetchById(@Param('id', ParseUUIDPipe) id: string): Promise<Orders> {
    return this.orderService.getById(id);
  }

  @Get()
  @ApiOperation({ description: 'Get all orders' })
  @ApiResponse({ status: 200, type: ResponseOrderDto, isArray: true })
  async fetchAll(): Promise<Orders[]> {
    return this.orderService.getAll();
  }

  @EventPattern(EVENT_EMIT.PAYMENT_CONFIRMED)
  async handlePaymentConfirm(data: IPayment): Promise<Orders | void> {
    return this.orderService.confirmById(data.id);
  }

  @EventPattern(EVENT_EMIT.PAYMENT_DECLINED)
  async handlePaymentDeclined(data: IPayment): Promise<Orders> {
    return this.orderService.cancelById(data.id);
  }
}
