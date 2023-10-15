import React, { useState, useRef, useEffect } from "react";
import { Layout, Input, Button, List } from "antd";
import { ArrowLeftOutlined, LogoutOutlined, SendOutlined, StarFilled } from "@ant-design/icons";
import { collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useStateValue } from "../state/StateProvider";
import { Menu } from "antd";
import Spinner from "../utils/Spinner";
import { signOut } from "firebase/auth";
import { message } from "antd";

const { Sider, Content } = Layout;

const ChatUI = () => {
	const [{ user }] = useStateValue();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [conversations, setConversations] = useState([]);
	const [selectedConversation, setSelectedConversation] = useState(null);
	const messagesEndRef = useRef(null);

	console.log(conversations);

	const gcv = (id) => conversations.find((c) => c.id === id);

	//Get all conversations of tourist a
	const getConversations = async () => {
		//get all doc where tourist is a
		const collectionRef = collection(db, "chat");
		// Create a query against the collection.
		const q = query(collectionRef, where(user.role, "==", user.id));

		onSnapshot(q, (querySnapshot) => {
			const conversationList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

			setConversations(conversationList);
			setSelectedConversation(conversationList[0].id);
		});

		// const querySnapshot = await getDocs(q);

		// const conversationList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		// setConversations(conversationList);
		// setSelectedConversation(conversationList[0].id);
	};

	const getConversation = async () => {
		const collectionRef = collection(
			db,
			"chat",
			`${gcv(selectedConversation).tourist}_${gcv(selectedConversation).guide}`,
			"messages"
		);

		const q = query(collectionRef, orderBy("time", "desc"));

		// Call the onSnapshot() method.
		onSnapshot(q, (querySnapshot) => {
			const messageList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setMessages(messageList.reverse());
		});
	};

	useEffect(() => {
		getConversations();
	}, []);

	useEffect(() => {
		selectedConversation && getConversation();
	}, [selectedConversation]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleInputChange = (e) => {
		setNewMessage(e.target.value);
	};

	const handleInputKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSendMessage();
		}
	};

	const handleSendMessage = async () => {
		const collectionRef = collection(
			db,
			"chat",
			`${gcv(selectedConversation).tourist}_${gcv(selectedConversation).guide}`,
			"messages"
		);
		const docRef = doc(collectionRef);

		await setDoc(docRef, {
			text: newMessage,
			sender: user.id,
			time: new Date().toISOString(),
		});

		setNewMessage("");
	};

	const handleEnd = async () => {
		const ref = doc(db, "chat", `${gcv(selectedConversation).tourist}_${gcv(selectedConversation).guide}`);

		await setDoc(ref, { isActive: false }, { merge: true });
	};

	const handleRating = async (i) => {
		const ref = doc(db, "chat", `${gcv(selectedConversation).tourist}_${gcv(selectedConversation).guide}`);

		user.role === "tourist"
			? await setDoc(ref, { touristRating: i }, { merge: true })
			: await setDoc(ref, { guideRating: i }, { merge: true });

		message.success("Rated successfully!");
	};

	console.log(user.id);

	const handleReport = async () => {
		const ref = doc(db, "chat", `${gcv(selectedConversation).tourist}_${gcv(selectedConversation).guide}`);

		await setDoc(ref, { isActive: false, isReported: true }, { merge: true });

		message.info("Reported successfully!");
	}

	return (
		<Layout hasSider style={{ height: "100vh" }}>
			<Sider
				style={{
					overflow: "auto",
					padding: "10px 5px",
					height: "100vh",
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0,
				}}
			>
				<div className='flex pb-4 mt-4'>
					<ArrowLeftOutlined style={{ marginLeft: "5px", marginRight: 8, color: "white" }} />
					<span style={{ fontSize: 16, color: "white" }}>Go Back</span>
				</div>
				{/* Menu component remains unchanged */}
				{/* Add your menu items here */}
				{conversations.length > 0 && (
					<Menu theme='dark' mode='inline' defaultSelectedKeys={conversations[0].id} style={{ height: "100%" }}>
						{conversations.map((conversation) => (
							<Menu.Item key={conversation.id} onClick={() => setSelectedConversation(conversation.id)}>
								<div className='text-white'>
									{user.role === "tourist" ? conversation.guideName : `${conversation.tourist.slice(0, 5)}`}
								</div>
							</Menu.Item>
						))}
					</Menu>
				)}
			</Sider>
			<Layout className='site-layout' style={{ marginLeft: 200 }}>
				<Content
					className='flex flex-col'
					style={{
						margin: "24px 16px 0",
						overflow: "initial",
						paddingTop: 20,
						minHeight: 0,
					}}
				>
					<div
						className='flex rounded-lg'
						style={{
							flexDirection: "column",
							width: "100%",
							padding: 20,
							textAlign: "center",
							height: "calc(100vh - 150px)", // Adjust the height accordingly
							overflowY: "auto", // Add scrollbar when content overflows
						}}
					>
						{messages.map((message, index) => (
							<div
								key={message.id}
								className='text-white'
								style={{
									display: "flex",
									width: "100%",
								}}
							>
								<div
									style={{ maxWidth: "60%", marginLeft: message.sender === user.id && "auto" }}
									className={`message-container ${message.sender === user.id ? "sent-message" : "received-message"}`}
								>
									{message.text}
								</div>
							</div>
						))}
						{/* <List
							// className='ml-auto'
							dataSource={messages}
							renderItem=
						/> */}
						<div ref={messagesEndRef}></div>
					</div>
					{gcv(selectedConversation)?.isActive ? (
						<div className='flex flex-row' style={{ marginTop: 20 }}>
							<Input
								placeholder='Type your message...'
								value={newMessage}
								onChange={handleInputChange}
								onKeyPress={handleInputKeyPress}
								style={{ marginRight: 10, flex: 1 }}
							/>
							<Button
								className='flex items-center justify-center'
								type='primary'
								icon={<SendOutlined />}
								onClick={handleSendMessage}
							/>
						</div>
					) : (
						<div style={{ color: "gray" }} className='text-center'>
							You can't contact with this person anymore.
						</div>
					)}
				</Content>
				{gcv(selectedConversation)?.isActive ? (
					<div className='flex mx-auto gap-2'>
						<div className=' pb-3'>
							<Button onClick={handleEnd} type='primary' danger>
								End Chat
							</Button>
						</div>
						{!gcv(selectedConversation)?.isReported && <Button onClick={handleReport}>Report This Chat</Button>}
					</div>
				) : (
					<div className='flex flex-col mx-auto pb-5 gap-2 items-center justify-center'>
						<div>
							{Array.from(Array(5).keys()).map((i) => (
								<StarFilled
									onClick={() => handleRating(i)}
									key={i}
									className={`text-lg  ${
										gcv(selectedConversation)?.[`${user.role}Rating`] &&
										gcv(selectedConversation)?.[`${user.role}Rating`] >= i
											? "text-yellow-500"
											: "fill-transparent"
									}`}
								/>
							))}
						</div>
						{!gcv(selectedConversation)?.isReported && <Button onClick={handleReport}>Report This Chat</Button>}
					</div>
				)}
			</Layout>
			<Button
				onClick={() => signOut(auth)}
				icon={<LogoutOutlined />}
				style={{ position: "absolute", bottom: "20px", left: "40px" }}
				type='primary'
				danger
			>
				Logout
			</Button>
		</Layout>
	);
};

export default ChatUI;
