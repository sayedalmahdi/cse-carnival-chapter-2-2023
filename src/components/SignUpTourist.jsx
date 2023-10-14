import React from "react";
import { Button, Modal } from "antd";
import { useState } from "react";
import { Checkbox, Form, Input } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

const SignUpTourist = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    // Handle form submission logic here
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
        Open Sign Up Modal
      </Button>
      <Modal
        className="custom-modal" // Add this class for custom styling
        title={<h3>Sign Up</h3>}
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
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
            rules={[
              {
                required: true,
                message: "Please accept the terms and conditions!",
              },
            ]}
          >
            <Checkbox>
              I agree to the <a href="/terms">terms and conditions</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Button
            icon={<GoogleOutlined />}
            style={{ background: "white", border: "1px solid #ccc" }}
            block
          >
            Sign Up with Google
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SignUpTourist;
