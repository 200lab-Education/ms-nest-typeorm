import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Message } from './components/alert/Message';
import { OrderTable } from './components/common/Table/Table';
import { MainLayout } from './components/layout/MainLayout/MainLayout';
import CreateOrder from './components/modal/CreateModal';
import { useAppDispatch } from './hooks/app-dispatch';
import { useAppSelector } from './hooks/app-selector';
import {
  createOrder,
  fetchAllOrder,
  setDataOrder,
} from './redux/slices/order.slice';
import * as orderService from './services/order-service/order-service';
import { Order, OrderPayload } from './types/order.type';
import { EVENT_EMIT } from './util/const/event-emit';
function App() {
  const orders = useAppSelector((state) => state.orderReducer);
  const [orderList, setOrderList] = useState(orders);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [stateOrder, setStateOrder] = useState<Record<string, string>>({
    id: '',
    state: '',
  });

  const dispatch = useAppDispatch();

  const socket = io(
    `ws://${process.env.REACT_APP_SOCKET_HOST}:${process.env.REACT_APP_SOCKET_PORT}`
  );

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  useEffect(() => {
    dispatch(fetchAllOrder());
  }, [dispatch]);

  useEffect(() => {
    setStateOrder({ id: '', state: '' });
  }, [orderList]);

  useEffect(() => {
    socket.on(EVENT_EMIT.UPDATE_STATUS, (data: Order) => {
      if (data) {
        dispatch(setDataOrder(data));
        setStateOrder({ id: data.id, state: data.state });
      }
    });
  }, [orders, socket, dispatch]);

  const openForm = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleSubmit = (value: OrderPayload) => {
    dispatch(createOrder(value));
  };

  const cancelOrder = (id: string) => {
    orderService.cancelOrderById(id);
  };

  return (
    <>
      <Button type="primary" onClick={openForm}>
        Create an order
      </Button>
      <MainLayout>
        <OrderTable data={orders} handleCancelOrder={cancelOrder} />
        <Message state={stateOrder} />
      </MainLayout>
      <CreateOrder
        isOpenForm={isOpenModal}
        closeModal={openForm}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default App;
