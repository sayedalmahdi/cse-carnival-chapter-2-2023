import React from "react";
import { Typography, Input } from "antd";
import { Button, Space } from "antd";
const { Title, Paragraph } = Typography;
import { Modal } from "antd";
import { useState } from "react";
import { Checkbox, Form } from "antd";

const Home = () => {
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
      <header className="header">
        <Title
          style={{
            color: "#2f2e41",
            paddingTop: "20px",
            fontWeight: "bold",
          }}
          level={1}
        >
          GoTo
        </Title>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Button
                onClick={showModal}
                style={{
                  background: "none",
                  color: "#2f2e41",
                  border: "1px solid #2f2e41",
                }}
                className="login-button"
              >
                Login
              </Button>
            </li>
            <li className="nav-item">
              <Button style={{}} className="rounded-button">
                Sign Up
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="tagline"></div>
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
      ;
    </>
  );
};

export default Home;
