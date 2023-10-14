import { Button, Modal } from "antd";
import { useState } from "react";
import { Checkbox, Form, Input } from "antd";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        className="custom-modal" // Add this class for custom styling
        title={<h3>Login</h3>}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          requiredMark={false}
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,

                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Login;
