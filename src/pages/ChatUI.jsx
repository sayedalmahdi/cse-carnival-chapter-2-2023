import React, { useState, useRef, useEffect } from "react";
import { Layout, Input, Button, List } from "antd";
import { ArrowLeftOutlined, SendOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }
    const updatedMessages = [...messages, { text: newMessage, type: "sent" }];
    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <Layout hasSider style={{ height: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          padding: "10px 5px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="header flex pb-4 mt-4">
          <ArrowLeftOutlined
            style={{ marginLeft: "5px", marginRight: 8, color: "white" }}
          />
          <span style={{ fontSize: 16, color: "white" }}>Go Back</span>
        </div>
        {/* Menu component remains unchanged */}
        {/* Add your menu items here */}
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content
          className="flex flex-col"
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            paddingTop: 20,
            minHeight: 0,
          }}
        >
          <div
            className="flex rounded-lg"
            style={{
              width: "100%",
              padding: 20,
              textAlign: "center",
              height: "calc(100vh - 150px)", // Adjust the height accordingly
              overflowY: "auto", // Add scrollbar when content overflows
            }}
          >
            <List
              className="ml-auto"
              dataSource={messages}
              renderItem={(message, index) => (
                <List.Item
                  className="text-white"
                  style={{
                    textAlign: message.type === "sent" ? "right" : "left",
                  }}
                >
                  <div
                    className={`message-container ${
                      message.type === "sent"
                        ? "sent-message"
                        : "received-message"
                    }`}
                  >
                    {message.text}
                  </div>
                </List.Item>
              )}
            />
            <div ref={messagesEndRef}></div>
          </div>
          <div className="flex flex-row" style={{ marginTop: 20 }}>
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              style={{ marginRight: 10, flex: 1 }}
            />
            <Button
              className="flex items-center justify-center"
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatUI;
