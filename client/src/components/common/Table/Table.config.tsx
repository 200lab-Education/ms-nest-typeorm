import { Button, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { Order } from '../../../types/order.type';
import { OrderStates } from '../../../util/enum/OrderStates';

export const COLUMNS = (
  handleCancelOrder: (id: string) => void
): ColumnsType<any> => {
  return [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_: unknown, record: Order) => {
        return <p>{record.payload.email}</p>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown, record: Order) => {
        return <p>{record.payload.name}</p>;
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: unknown, record: Order) => {
        return <p>{record.payload.quantity}</p>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'price',
      render: (_: unknown, record: Order) => {
        return <p>{record.payload.price}</p>;
      },
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (_, record: Order): React.ReactNode => {
        const { state } = record;
        let color = '';

        switch (state) {
          case OrderStates.CANCELLED:
            color = 'error';
            break;
          case OrderStates.CREATED:
            color = 'warning';
            break;
          case OrderStates.CONFIRMED:
            color = 'success';
            break;
          case OrderStates.DELIVERED:
            color = 'processing';
            break;
        }
        return (
          <>
            <Tag color={color}>{state}</Tag>
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Order) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              disabled={record.state !== OrderStates.CREATED}
              onClick={() => handleCancelOrder(record.id)}
            >
              Cancel order
            </Button>
            <Link to={`/order/${record.id}`}>View details</Link>
          </Space>
        );
      },
    },
  ];
};
