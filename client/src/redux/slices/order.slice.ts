import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as orderService from '../../services/order-service/order-service';
import { Order, OrderPayload, Orders } from '../../types/order.type';

const initialState: Orders = [];

export const fetchAllOrder = createAsyncThunk('orders/getAll', async () => {
  try {
    const { data } = await orderService.getAllOrders();
    return data;
  } catch (err) {
    throw err;
  }
});

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (payload: OrderPayload) => {
    try {
      const { data } = await orderService.createOrder({
        ...payload,
        price: Number(payload.price),
        quantity: Number(payload.quantity),
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const cancelOrderId = createAsyncThunk(
  'orders/cancelOrder',
  async (id: string) => {
    try {
      const { data } = await orderService.cancelOrderById(id);
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setDataOrder: (state, { payload }: PayloadAction<Order>) => {
      const newData = state.map((order: Order) =>
        order.id === payload.id ? { ...payload } : order
      );
      return newData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllOrder.fulfilled,
      (state, { payload }: PayloadAction<[]>) => {
        return (state = payload);
      }
    );

    builder.addCase(
      createOrder.fulfilled,
      (state, { payload }: PayloadAction<Order>) => {
        state.push(payload);
      }
    );

    builder.addCase(
      cancelOrderId.fulfilled,
      (state, { payload }: PayloadAction<Order>) => {
        const newData = state.map((order: Order) =>
          order.id === payload.id ? { ...payload } : order
        );
        return newData;
      }
    );
  },
});

export const { setDataOrder } = orderSlice.actions;

export default orderSlice.reducer;
