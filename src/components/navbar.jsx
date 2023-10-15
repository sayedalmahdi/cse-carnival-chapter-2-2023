import React from "react";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useState } from "react";
import Guides from "./guideList";
import Approval from "./Approval";
import { Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Reports from "./Reports";
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
         <Button className="rounded-button" onClick={() => signOut(auth)} icon={<LogoutOutlined/>}>Logout</Button>
      </div>
    </nav>
  );
};

const SideNavbar = ({ onItemClick }) => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Guides", "sub1"),
    getItem("Chat", "sub2"),
    getItem("Approval", "sub3"),
    getItem("Reports", "sub4"),
  ];

  const onClick = (e) => {
    if (onItemClick) {
      onItemClick(e.key);
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
        color: "grey",
        fontWeight: "bold",

        height: "100vh",
        backgroundColor: "#F0F2F5",
      }}
      mode="inline"
      items={items}
      className=" flex flex-col gap-5 hscreen overflow-y-auto"
    />
  );
};

const CombinedNavbar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleItemClick = (key) => {
    setSelectedMenuItem(key);
  };

  return (
    <div>
      <div>
        <TopNavbar />
        <div className="flex">
          <SideNavbar onItemClick={handleItemClick} />
          {selectedMenuItem === "sub1" && (
            <div className="flex-1">
              {" "}
              <Guides />{" "}
            </div>
          )}
          {selectedMenuItem === "sub2" && <div>Display Chat Here</div>}
          {selectedMenuItem === "sub3" && (
            <div className="flex-1">
              {" "}
              <Approval />
            </div>
          )}
          {selectedMenuItem === "sub4" &&  <div className="flex-1"><Reports/>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default CombinedNavbar;
