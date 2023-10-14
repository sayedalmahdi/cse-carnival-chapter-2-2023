import React from "react";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import Guides from "./guideList";
import Approval from "./Approval";
import { Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const TopNavbar = () => {
  return (
    <nav
      className="p-3 shadow"
      style={{
        backgroundColor: "#458bdf",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Title className="title" style={{ color: "white" }} level={3}>
        GoTo
      </Title>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
        }}
      >
        <Text
          style={{
            fontSize: "18px",
            color: "#AEDFFA",
            marginRight: "5px",
          }}
        >
          User
        </Text>
        <UserOutlined
          style={{
            marginLeft: "5px",
            marginRight: "5px",
          }}
        />
      </div>
    </nav>
  );
};

export default TopNavbar;
