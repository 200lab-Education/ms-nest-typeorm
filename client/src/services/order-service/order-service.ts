import { AxiosResponse } from 'axios';
import { ORDER_API } from '../api-service';
import axios from '../axios-config';
import { OrderPayload } from './../../types/order.type';

export const getAllOrders = async (): Promise<AxiosResponse> => {
  return await axios.get(ORDER_API);
};

export const getOrderDetails = async (
  orderId: string
): Promise<AxiosResponse> => {
  return axios.get(`${ORDER_API}/${orderId}`);
};

export const createOrder = async (
  payload: OrderPayload
): Promise<AxiosResponse> => {
  return axios.post(`${ORDER_API}`, { payload: payload });
};

export const cancelOrderById = async (
  orderId: string
): Promise<AxiosResponse> => {
  return axios.patch(`${ORDER_API}/${orderId}`);
};
