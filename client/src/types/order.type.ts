import { OrderStates } from '../util/enum/OrderStates';

export type Orders = Order[];

export type Order = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  payload: OrderPayload;
  state: OrderStates;
};

export type OrderPayload = {
  name: string;
  email: string;
  quantity: number;
  price: number;
};
