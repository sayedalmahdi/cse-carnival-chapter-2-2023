import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import {
  CompassOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Select } from "antd";

const ProfileModal = ({ visible, onCancel }) => {
  const handleDistrictsChange = (values) => {
    setUserData({
      ...userData,
      districts: values,
    });
  };

  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    phoneNumber: "",
    area: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Handle saving user data, for example, by sending it to the server.
    // You can implement your logic for saving the data here.
    // For now, let's just close the modal.
    onCancel();
  };

  const inputStyle = {
    marginBottom: "10px",
    // You can adjust the gap by changing the margin-bottom value
    height: "40px",
  };

  return (
    <Modal
      title="Profile Details"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Avatar size={100} icon={<UserOutlined />} />
      </div>
      <Input
        style={inputStyle}
        placeholder="Full Name"
        name="userName"
        value={userData.userName}
        onChange={handleInputChange}
        prefix={<UserOutlined />}
      />
      <Input
        style={inputStyle}
        placeholder="Email"
        name="userEmail"
        value={userData.userEmail}
        onChange={handleInputChange}
        prefix={<MailOutlined />}
      />
      <Input
        style={inputStyle}
        placeholder="Phone Number"
        name="phoneNumber"
        value={userData.phoneNumber}
        onChange={handleInputChange}
        prefix={<PhoneOutlined />}
      />
      <Input
        style={inputStyle}
        placeholder="Address"
        name="address"
        value={userData.address}
        onChange={handleInputChange}
        prefix={<EnvironmentOutlined />}
      />
      <Select
        mode="tags"
        placeholder="Select or add districts"
        value={userData.districts}
        onChange={handleDistrictsChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />
    </Modal>
  );
};

export default ProfileModal;
