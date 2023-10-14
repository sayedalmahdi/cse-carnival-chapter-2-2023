import React from "react";
import { Link } from "react-router-dom"; 
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from "react";
import Guides from "./guideList";
const TopNavbar = () => {
	return (
		<nav className="bg-white p-4 shadow">
			<div className="container mx-auto">
				<div className="flex justify-between items-center">
					<div className="font-bold text-xl">Your App</div>
					<div className="hidden md:flex space-x-4">
						<Link to="/" className="text-gray-600 hover:text-gray-800">
							Profile
						</Link>
						
					</div>
				</div>
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
      }}
      mode="inline"
      items={items}
      className="h-screen overflow-y-auto"
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
					{selectedMenuItem === "sub1" && <div className="flex-1"> <Guides/> </div>}
					{selectedMenuItem === "sub2" && <div>Display Chat Here</div>}
					{selectedMenuItem === "sub4" && <div>Display Reports Here</div>}
				</div>
			</div>
		</div>
	);
};


export default CombinedNavbar;
