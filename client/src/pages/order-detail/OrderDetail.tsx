import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderDetails } from '../../services/order-service/order-service';
import { Order } from '../../types/order.type';

export const OrderDetails: React.FC = () => {
  const [order, setOrder] = useState<Order>();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await getOrderDetails(id || '');
      setOrder(data);
    })();
  }, [id]);
  return (
    <>
      {order && (
        <>
          <ul>
            <li>{order?.state}</li>
            <li>{order?.payload.name}</li>
            <li>{order?.payload.price}</li>
            <li>{order?.state}</li>
            <li>{order?.payload.email}</li>
            <li>{order?.updatedAt.toString()}</li>
          </ul>
          <Button type="primary" onClick={() => navigate(-1)}>
            Back to previous
          </Button>
        </>
      )}
    </>
  );
};
