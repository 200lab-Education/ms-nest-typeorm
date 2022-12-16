import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from '../events/events.gateway';
import { CreateOrderDto } from './dtos/create-orders.dto';
import { Orders } from './entities/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersServices } from './orders.service';

describe('Order Controller', () => {
  let orderController: OrdersController;
  let orderService: OrdersServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: () => {
            return {
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'admin',
              database: 'orders-management',
              autoLoadEntities: true,
              synchronize: true,
            };
          },
        }),
        ConfigModule,
        TypeOrmModule.forFeature([Orders]),
      ],
      controllers: [OrdersController],
      providers: [OrdersServices, EventsGateway],
    }).compile();
    orderController = module.get<OrdersController>(OrdersController);
    orderService = module.get<OrdersServices>(OrdersServices);
  });

  describe('Create Orders', () => {
    it('should create order is success ', async () => {
      const order = {
        id: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        state: 'create' as any,
        payload: {
          name: 'test',
          email: 'test',
          quantity: 1,
          price: 1,
        },
      };
      jest
        .spyOn(orderService, 'create')
        .mockImplementation(() => new Promise((resolve) => resolve(order)));
      expect(await orderController.create(new CreateOrderDto())).toEqual(order);
    });
  });

  describe('Get All Orders', () => {
    it('should response list order ', async () => {
      const orders = [
        {
          id: 'test',
          createdAt: new Date(),
          updatedAt: new Date(),
          state: 'create' as any,
          payload: {
            name: 'test',
            email: 'test',
            quantity: 1,
            price: 1,
          },
        },
      ];
      jest
        .spyOn(orderService, 'getAll')
        .mockImplementation(() => new Promise((resolve) => resolve(orders)));
      expect(await orderController.fetchAll()).toBe(orders);
    });
  });

  describe('Get By Orders Id', () => {
    it('should response order match with param id ', async () => {
      const order = {
        id: '1cfe9810-1b9a-4128-9155-9d19a63910002',
        createdAt: new Date(),
        updatedAt: new Date(),
        state: 'create' as any,
        payload: {
          name: 'test',
          email: 'test',
          quantity: 1,
          price: 1,
        },
      };
      jest
        .spyOn(orderService, 'getById')
        .mockImplementation(() => new Promise((resolve) => resolve(order)));
      expect(
        await orderController.fetchById(
          '1cfe9810-1b9a-4128-9155-9d19a63910002',
        ),
      ).toBe(order);
    });
  });

  describe('Cancel order by id', () => {
    it('should response order has been called ', async () => {
      const order = {
        id: '1cfe9810-1b9a-4128-9155-9d19a63910002',
        createdAt: new Date(),
        updatedAt: new Date(),
        state: 'cancelled' as any,
        payload: {
          name: 'test',
          email: 'test',
          quantity: 1,
          price: 1,
        },
      };
      jest
        .spyOn(orderService, 'cancelById')
        .mockImplementation(() => new Promise((resolve) => resolve(order)));
      expect(
        await orderController.cancel('1cfe9810-1b9a-4128-9155-9d19a63910002'),
      ).toBe(order);
    });
  });
});
