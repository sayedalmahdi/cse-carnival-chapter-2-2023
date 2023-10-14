import React from "react";
import { Tabs, Card } from "antd";

const { TabPane } = Tabs;

const usersData = [
	{ id: 1, name: "User 1", role: "Active" },
	{ id: 2, name: "User 2", role: "Pending" },
	{ id: 3, name: "User 3", role: "Suspended" },
	// Add more users as needed
];

const filterUsersByRole = (role) => {
	return usersData.filter((user) => user.role === role);
};

const renderTabPane = (status) => {
	const users = filterUsersByRole(status);
	return (
		<TabPane tab={status} key={status.toLowerCase()}>
			{users.map((user) => (
				<Card key={user.id} style={{ marginBottom: 10 }}>
					{user.name}
				</Card>
			))}
		</TabPane>
	);
};

const Guide = () => (
	<Tabs defaultActiveKey="active" centered>
		{["Active", "Pending", "Suspended"].map((status) => renderTabPane(status))}
	</Tabs>
);

export default Guide;
