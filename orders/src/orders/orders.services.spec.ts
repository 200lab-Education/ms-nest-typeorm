import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EVENT_EMIT } from '../common/const/event-emit';
import { EventsGateway } from '../events/events.gateway';
import { Orders } from './entities/orders.entity';
import { OrdersServices } from './orders.service';

describe('Order Controller', () => {
  let orderService: OrdersServices;
  let orderRepo: Repository<Orders>;
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
              database: 'order',
              autoLoadEntities: true,
              synchronize: true,
            };
          },
        }),
        ConfigModule,
        ClientsModule.register([
          {
            name: 'ORDER_CREATED',
            transport: Transport.REDIS,
            options: {
              host: 'localhost',
              port: 6379,
            },
          },
        ]),
        ClientsModule.register([
          {
            name: 'PAYMENT_PROCESS',
            transport: Transport.REDIS,
            options: {
              host: 'localhost',
              port: 6379,
            },
          },
        ]),
        TypeOrmModule.forFeature([Orders]),
      ],
      providers: [OrdersServices, EventsGateway],
    }).compile();
    orderService = module.get<OrdersServices>(OrdersServices);
    orderRepo = module.get<Repository<Orders>>(getRepositoryToken(Orders));
  });

  describe('Create Orders', () => {
    it('Repository Order should be called ', async () => {
      const repo = jest.spyOn(orderRepo, 'save');
      const event = jest.spyOn(orderService, 'emitEvent');
      const res = await orderService.create({
        payload: {
          name: 'test',
          email: 'name@test.com',
          quantity: 1,
          price: 1,
        },
      });

      expect(repo).toHaveBeenCalled();
      expect(event).toHaveBeenCalledWith(EVENT_EMIT.CREATE_ORDER, res);
    });
  });

  describe('Get order by id', () => {
    it('Service get order should be called ', async () => {
      const repo = jest.spyOn(orderRepo, 'findOne');
      await orderService.getById('0e0d378c-d070-4f88-a74f-c3b3a21641a5');
      expect(repo).toHaveBeenCalled();
    });
  });

  describe('Get all orders', () => {
    it('Service get all orders should be called ', async () => {
      const repo = jest.spyOn(orderRepo, 'find');
      await orderService.getAll();
      expect(repo).toHaveBeenCalled();
    });
  });
});
