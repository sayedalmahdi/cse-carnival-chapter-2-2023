import React from "react";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import { db, storage } from "../firebase";
import { Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Title } = Typography;
import { Avatar } from "antd";

import {
  AutoComplete,
  Cascader,
  Checkbox,
  Col,
  InputNumber,
  Row,
  Select,
} from "antd";
const { Option } = Select;
import SignupSvg from "../assets/signup.svg";

const SignUpAsUser = () => {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const districts = ["District 1", "District 2", "District 64"];

  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container flex" style={{ height: "100%" }}>
        <div
          className="w-1/2 flex items-center justify-center overscroll-none"
          style={{
            position: "fixed",
            left: 0,
            height: "100vh",
            backgroundColor: "#6f7880   ",
          }}
        >
          <img src={SignupSvg} alt="" width={400} />
        </div>
        <div
          className="w-1/2 bg-gray-100 p-4 flex flex-col items-center justify-center"
          style={{
            overflowY: "auto",

            padding: "20px",
            marginLeft: "50%",
          }}
        >
          <Title style={{ marginBottom: 30 }} level={2}>
            Apply as a guide
          </Title>

          <Form
            requiredMark={false}
            {...formItemLayout}
            form={form}
            name="register"
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
          >

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
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
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="residence"
              label="Address"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "Please select your address!",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="intro"
              label="Intro"
              rules={[
                {
                  required: true,
                  message: "Please input Intro",
                },
              ]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "Please select gender!",
                },
              ]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="area"
              label="Area"
              rules={[
                {
                  required: true,
                  message: "Please select your area!",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Select your area">
                {districts.map((district) => (
                  <Option key={district} value={district}>
                    {district}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="nid"
              label="National ID"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              extra="Please upload a scanned copy of your National ID."
              rules={[
                {
                  required: true,
                  message: "Please upload your National ID!",
                },
              ]}
            >
              <Upload
                name="nid"
                action="https://example.com/upload" // Specify your upload endpoint here
                listType="text"
                beforeUpload={() => false} // Returning false means prevent automatic upload, you can handle upload manually
              >
                <Button icon={<UploadOutlined />}>Upload National ID</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpAsUser;

{
  /* <Form
  onFinish={handleRegister}
  form={form}
  name="register"
  className="flex flex-col justify-center"
>
  <Form.Item
    name="email"
    rules={[{ required: true, message: "Please input your email address" }]}
  >
    <Input
      className="py-2 px-5 w-[100%]"
      type="email"
      placeholder="Email address"
    />
  </Form.Item>
  <Form.Item
    name="password"
    rules={[
      { required: true, message: "Please input your password" },
      { min: 6, message: "Password must be at least 6 characters" },
    ]}
  >
    <Input
      className="py-2 px-5 w-[100%]"
      type="password"
      placeholder="Password"
    />
  </Form.Item>
  <Form.Item>
    <Button
      loading={loading}
      className="py-2 px-5 w-[100%] h-auto"
      type="primary"
      htmlType="submit"
    >
      Sign Up
    </Button>
  </Form.Item>
</Form>; */
}
