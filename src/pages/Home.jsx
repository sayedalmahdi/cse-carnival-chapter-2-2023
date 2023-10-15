import React from "react";
import { Typography, Input } from "antd";
import { Button, Space } from "antd";
const { Title, Paragraph, Text } = Typography;
import { Modal } from "antd";
import { useState } from "react";
import { Checkbox, Form } from "antd";
import SignUpTourist from "../components/SignUpTourist";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { message } from "antd";

import ChatUI from "./ChatUI";
import Offering from "../components/offerings";
import { Footer } from "antd/lib/layout/layout";
import homeCover from "../assets/homepage2.svg"
import ctaCover from "../assets/chatui.png";
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const onFinish = async (values) => {
		try {
			const auth = getAuth();
			await signInWithEmailAndPassword(auth, values.email, values.password);
			message.success("Login successful!");
			handleCancel();
		} catch (error) {
			console.error("Error signing in: ", error);
			message.error("Error signing in.");
		}
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
      <div className=" bg-transparent h-20 flex flex-col gap-10">
        <header className="flex justify-between p-4">
          <Title
            style={{
              color: "#2f2e41",
              paddingTop: "15px",
              paddingLeft: "50px",
              fontWeight: "bold",
              fontSize: "40px",
            }}
            level={1}
          >
            GoTo
          </Title>
          <nav>
            <ul className="flex justify-between mt-4 gap-4">
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
                <Button
                  onClick={() => setIsSignUpModalOpen(true)}
                  style={{}}
                  className="rounded-button"
                >
                  Sign Up
                </Button>
              </li>
            </ul>
          </nav>
        </header>
        <SignUpTourist
          isModalOpen={isSignUpModalOpen}
          setIsModalOpen={setIsSignUpModalOpen}
        />
        <div className="flex flex-col justify-center gap-3">
          <div className="flex justify-center h-96">
            <img src={homeCover} alt="" />{" "}
          </div>

          <Title
            className="flex justify-center text-2xl font-bold"
            style={{
              color: "#2f2e41",
              paddingTop: "15px",
              paddingLeft: "50px",
              fontWeight: "bold",
              fontSize: "30px",
            }}
            level={4}
          >
            Need travel guidance?
          </Title>
          <Text
            className="flex justify-center"
            style={{
              color: "#2f2e41",
              fontSize: "18px",
            }}
            level={4}
          >
            Embark on unforgettable journeys with our Travel Consultancy System
          </Text>
        </div>
        <div
          className="flex justify-between p-8 align-middle"
          style={{
            background: "#2f2e41",
            color: "#2f2e41",
            border: "1px solid #2f2e41",
          }}
        >
          <div className="nav-item">
            <div className="relative w-48 p-12">
              <img
                className="rounded-lg"
                src={ctaCover}
                width="700px"
                height="auto"
                alt=""
              />
              <Button
                className="your-button-style absolute top-3/4 left-64 w-48 transform -translate-x-1/2 -translate-y-1/2 text-white px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: "#2f2e41",
                  height: "50px",
                  width: "250px",
                }}
              >
                Sign Up Now
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center p-3 shadow-white">
            <Text className="bg-white p-8 rounded-t-lg flex justify-center text-2xl font-bold ">
              What we offer
            </Text>
            <div>
              {" "}
              <Offering />{" "}
            </div>
          </div>
        </div>

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
      </div>
    </>
  );
};

export default Home;
