import React, { useState } from "react";
import { Tabs, List, Pagination, Modal, Card, Col, Button } from "antd";
import Title from "antd/es/typography/Title";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import CustomCard from "./CustomCard";
import { Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const GuideCard = ({ guide, fetchGuides }) => {
	const [loading, setLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		console.log("Cancel");
		setIsModalVisible(false);
	};

	const handleApprove = async () => {
		setLoading(true);
		await updateDoc(doc(db, "users", guide.id), {
			approved: true,
		});

		setIsModalVisible(false);
		fetchGuides();
		setLoading(false);
	};

	const handleReject = async () => {
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
		<div key={guide.name} className='shadow rounded-lg' style={cardStyle}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<div className='flex flex-col gap-2 ml-2'>
					<span onClick={showModal}>{guide.name}</span>
					<span>
						{guide.area.map((i) => (
							<Tag style={{ fontSize: "0.6rem" }}>{i}</Tag>
						))}
					</span>
				</div>
				<div className='flex gap-4'>
					<Button onClick={showModal}>View Profile</Button>
				</div>
			</div>

			<Modal
				title='KYC Details'
				open={isModalVisible}
				onCancel={handleCancel}
				footer={null} // Hide the OK and Cancel buttons
			>
				<div className='flex justify-between mt-3 py-3 items-center'>
					<div className='flex flex-col gap-3'>
						<div>
							<b>Name: </b>
							<span>{guide.name}</span>
						</div>
						<div>
							<b>Email: </b>
							<span>{guide.email}</span>
						</div>
						<div>
							<b>Phone: </b>
							<span>{guide.phone}</span>
						</div>
						<div>
							<b>Address: </b>
							<span>{guide.residence}</span>
						</div>
						<div>
							<b>Spots: </b>
							{guide.area.map((i) => (
								<Tag style={{ fontSize: "0.6rem" }}>{i}</Tag>
							))}
						</div>
					</div>
					<div>
						{" "}
						<Avatar className='mr-5' size={100} src={guide.avatar} />
					</div>
				</div>
				<div
					style={{ border: "2px dotted #949494", borderRadius: "10px" }}
					className='flex justify-between mt-3 px-4 py-3 items-center'
				>
					<img className='w-full object-contain' src={guide.nid} alt='nid' />
				</div>
				<div className='flex justify-end gap-5 mt-5'>
					<Button loading={loading} onClick={handleApprove}>
						Approve
					</Button>
					<Button onClick={handleReject} icon={<DeleteOutlined />} danger type='primary'>
						Reject
					</Button>
				</div>
			</Modal>
		</div>
	);
};

const Approval = () => {
	const [guides, setGuides] = useState([]);

	const fetchGuides = async () => {
		const ref = collection(db, "users");
		const q = query(ref, where("approved", "==", false));

		const querySnapshot = await getDocs(q);

		const guideList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		setGuides(guideList);
	};

	useEffect(() => {
		fetchGuides();
	}, []);

	return (
		<div style={{ padding: "20px" }}>
			<Title level={3}>Guide Approval</Title>
			<div style={{ marginTop: "20px" }}>
				{guides.map((guide) => (
					<GuideCard key={guide.name} guide={guide} fetchGuides={fetchGuides} />
				))}
			</div>
		</div>
	);
};

export default Approval;
