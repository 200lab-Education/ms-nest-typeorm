export interface IOrder {
  id: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  payload: {
    name: string;
    email: string;
    quantity: number;
    price: number;
  };
}
