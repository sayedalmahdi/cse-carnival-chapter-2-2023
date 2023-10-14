import React, { useState } from "react";
import { Tabs, List, Pagination, Modal, Card } from "antd";
import Title from "antd/es/typography/Title";

const GuideCard = ({ guide }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		console.log("Cancel");
		setIsModalVisible(false);
	};

	console.log(isModalVisible);

	const cardStyle = {
		width: "90%",
		borderRadius: "8px",
		padding: "12px",
		marginBottom: "8px",
		backgroundColor: "#f9f9f9",
		cursor: "pointer",
	};

	return (
		<div key={guide.name} className="shadow rounded-lg" style={cardStyle}>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div>
					<span onClick={showModal}>{guide.name}</span>
				</div>
				<div>
					<span>{guide.status === "active" ? "Approved" : "Not Approved"}</span>
				</div>
			</div>

			<Modal
				title={guide.name}
				open={isModalVisible}
				onCancel={handleCancel}
				footer={null} // Hide the OK and Cancel buttons
			>
				<p>Approval Status: {guide.status}</p>
			</Modal>
		</div>
	);
};

const Approval = () => {
	// Mocked guide data
	const guides = [
		{ name: "Guide 1", status: "active" },
		{ name: "Guide 2", status: "pending" },
		{ name: "Guide 3", status: "suspended" },
	];

	return (
		<div style={{ padding: "20px" }}>
			<Title level={3}>Guide Approval</Title>
			<div style={{ marginTop: "20px" }}>
				{guides.map((guide) => (
					<GuideCard key={guide.name} guide={guide} />
				))}
			</div>
			<div style={{ marginTop: "20px" }}>
				<Pagination
					className="flex justify-center"
					current={1}
					total={guides.length}
					pageSize={3}
				/>
			</div>
		</div>
	);
};

export default Approval;
