import React from "react";
import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={(broken) => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["1"]} // Changed to "1" for default selection
				>
					{[
						UserOutlined,
						VideoCameraOutlined,
						UploadOutlined,
						UserOutlined,
					].map((icon, index) => (
						<Menu.Item key={String(index + 1)} icon={React.createElement(icon)}>
							{`Nav ${index + 1}`}
						</Menu.Item>
					))}
				</Menu>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					Header
				</Header>
				<Content
					style={{
						margin: "24px 16px 0",
					}}
				>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
						}}
					>
						Content
					</div>
				</Content>
				<Footer
					style={{
						textAlign: "center",
					}}
				>
					Ant Design ©2023 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};

export default App;
