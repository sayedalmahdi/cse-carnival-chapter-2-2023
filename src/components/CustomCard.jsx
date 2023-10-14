import React, { useState } from "react";
import { Card, Avatar } from "antd";
import { StarFilled, EnvironmentOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { message } from "antd";

const createPaymentSession = httpsCallable(functions, "createPaymentSession");

const CustomCard = ({ guide }) => {
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imgId, setImgId] = useState(Math.floor(Math.random() * 200) + 1);

	const pay = async () => {
		setLoading(true);
		try {
			const res = await createPaymentSession({ guideId: guide.id, guideName: guide.name });

			console.log(res.data);
			if (res.data.ok) window.location.href = res.data.url;
		} catch (e) {
			message.error("Something went wrong");
			console.error(e);
			setLoading(false);
		}
	};
	return (
		<>
			<Modal
				title='Are you sure?'
				open={isModalOpen}
				onOk={pay}
				onCancel={() => setIsModalOpen(false)}
				okText={`Pay $${guide?.rate} `}
				cancelButtonProps={{ disabled: loading, danger: true }}
				okButtonProps={{ loading, disabled: loading }}
			>
				<p>{`Consultation with ${guide?.name} will cost you $${guide?.rate}`}</p>
			</Modal>
			<Card
				onClick={() => setIsModalOpen(true)}
				className='shadow transform hover:scale-105 transition-transform duration-300 cursor-pointer'
				title={
					<div
						style={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap",
							paddingTop: "10px",
							marginBottom: "10px",
						}}
					>
						<Avatar size={50} src={guide?.avatar} />
						<div style={{ marginLeft: 16 }}>
							<div style={{ fontSize: 18 }}>{guide?.name}</div>
							<div style={{ color: "brown" }}>
								<StarFilled style={{ color: "orange", marginRight: 4 }} />
								{guide?.review || 0} (Reviews)
							</div>
						</div>
					</div>
				}
			>
				<div>
					<img
						key={guide?.id}
						className='rounded-lg'
						src={`https://picsum.photos/id/${imgId}/300/200`}
						alt='Card'
						style={{ width: "100%", height: "auto", margin: "5px 0" }}
					/>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: "10px",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<EnvironmentOutlined style={{ marginRight: "4px", fontSize: "16px", color: "gray" }} />
						<div style={{ fontSize: "14px" }}>{guide?.residence}</div>
					</div>
					<div
						style={{
							marginRight: "8px",
							color: "green",
							fontWeight: "bold",
							fontSize: "18px",
						}}
					>
						${guide?.rate || "N/A"}
					</div>
				</div>
			</Card>
		</>
	);
};

export default CustomCard;
