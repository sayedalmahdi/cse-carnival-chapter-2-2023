import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Button, Input } from "antd";
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";

const Chat = ({ currentUser, otherUser }) => {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");

	const getConversation = async () => {
		const collectionRef = collection(db, "chat", "a_b", "messages");

		// Call the onSnapshot() method.
		onSnapshot(collectionRef, (querySnapshot) => {
			const messageList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setMessages(messageList);
		});
	};

	useEffect(() => {
		getConversation();
	}, [currentUser, otherUser]);

	const sendMessage = async () => {
		const collectionRef = collection(db, "chat", "a_b", "messages");
		const docRef = doc(collectionRef);

		await setDoc(docRef, {
			message,
			sender: "a",
			time: new Date().toISOString(),
		});
	};

	return (
		<div>
			<div>Messages: </div>
			{messages.map((message) => (
				<div key={message.id}>
					{message.sender}: {message.message}
				</div>
			))}
			<div>Message: </div>
			<Input type='text' onChange={(e) => setMessage(e.target.value)} value={message} />
			<Button onClick={sendMessage}>Send</Button>
		</div>
	);
};

export default Chat;
