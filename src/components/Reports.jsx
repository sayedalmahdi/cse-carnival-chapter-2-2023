import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import { useEffect } from "react";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { Modal } from "antd";

const Reports = () => {
	const [reports, setReports] = useState([]);
	const [modalContent, setModalContent] = useState(null);

	const fetchReports = async () => {
		const collectionRef = collection(db, "chat");
		// Create a query against the collection.
		const q = query(collectionRef, where("isReported", "==", true));

		onSnapshot(q, (querySnapshot) => {
			const conversationList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

			setReports(conversationList);
		});
	};

	useEffect(() => {
		fetchReports();
	}, []);

	const handleShowModal = async (r) => {
		const collectionRef = collection(db, "chat", r, "messages");

		const q = query(collectionRef, orderBy("time", "desc"));

		// Call the onSnapshot() method.
		onSnapshot(q, (querySnapshot) => {
			const messageList = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
				senderRole: doc.data().sender === r.split("_")[0] ? "tourist" : "guide",
			}));
			setModalContent(messageList.reverse());
		});
	};

	const cardStyle = {
		width: "90%",
		borderRadius: "8px",
		padding: "12px",
		marginBottom: "8px",
		backgroundColor: "#f9f9f9",
		cursor: "pointer",
	};

	console.log(modalContent);

	return (
		<div style={{ padding: "20px" }}>
			<Title level={3}>User Reports</Title>
			<div style={{ marginTop: "20px" }}>
				{reports.map((r) => (
					<div key={r.guideName} className='shadow rounded-lg' style={cardStyle}>
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
							<div className='flex flex-col gap-2 ml-2'>
								<span>{r.guideName}</span>
								<span></span>
							</div>
							<div className='flex gap-4'>
								<Button onClick={() => handleShowModal(r.id)}>View Chat</Button>
							</div>
						</div>
					</div>
				))}
			</div>
			<Modal
				title='Chat Details'
				open={modalContent}
				onCancel={() => setModalContent(null)}
				footer={null} // Hide the OK and Cancel buttons
			>
				{modalContent?.map((m) => (
					<div key={m.id} className='flex justify-between mt-3 py-3 items-center'>
						<div className='flex flex-col'>
							<span>{m.senderRole}</span>
							<span className='shadow mt-2 mb-1 px-3 py-2 rounded'>{m.text}</span>
							<span className='text-xs'>{m.time}</span>
						</div>
					</div>
				))}
			</Modal>
		</div>
	);
};

export default Reports;
