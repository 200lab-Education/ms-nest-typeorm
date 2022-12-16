import { Button, Form, Input, Modal } from 'antd';
import { OrderPayload } from '../../types/order.type';
interface ICreateOrder {
  handleSubmit: (e: OrderPayload) => void;
  isOpenForm: boolean;
  closeModal: () => void;
}

const CreateOrder: React.FC<ICreateOrder> = ({
  handleSubmit,
  isOpenForm,
  closeModal,
}) => {
  return (
    <Modal
      open={isOpenForm}
      closable={false}
      footer={[
        <>
          <Button
            type="primary"
            form="create-order"
            key="submit"
            htmlType="submit"
            onClick={closeModal}
          >
            Submit
          </Button>
          <Button form="create-order" htmlType="reset" onClick={closeModal}>
            Close
          </Button>
        </>,
      ]}
    >
      <Form onFinish={handleSubmit} name="create-order">
        <Form.Item name="name" label="Name" rules={[{ required: true}]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateOrder;
