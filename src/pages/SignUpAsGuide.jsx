import React from "react";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import { db, storage } from "../firebase";

const SignUpAsUser = () => {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const handleUpload = async (file) => {
		try {
			const storageRef = storage.ref();
			const fileRef = storageRef.child(file.name);
			await fileRef.put(file);
			return fileRef.getDownloadURL();
		} catch (error) {
			console.error("Error uploading image: ", error);
			message.error("Error uploading image.");
		}
	};
	const handleRegister = async (values) => {
		setLoading(true);

		try {
			const imageUrl = await handleUpload(values.pic[0].originFileObj);
			const userData = {
				name: values.name,
				email: values.email,
				phone: values.phone,
				about: values.about,
				address: values.address,
				picUrl: imageUrl,
				area: values.area,
				isTourGuide: values.isTourGuide,
			};
			await db.collection("users").add(userData);
			message.success("Signup successful!");
		} catch (error) {
			console.error("Error signing up: ", error);
			message.error("Error signing up.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center">
			<Form
				onFinish={handleRegister}
				form={form}
				name="register"
				className="flex flex-col justify-center"
			>
				<Form.Item
					name="email"
					rules={[
						{ required: true, message: "Please input your email address" },
					]}
				>
					<Input
						className="py-2 px-5 w-[100%]"
						type="email"
						placeholder="Email address"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{ required: true, message: "Please input your password" },
						{ min: 6, message: "Password must be at least 6 characters" },
					]}
				>
					<Input
						className="py-2 px-5 w-[100%]"
						type="password"
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item>
					<Button
						loading={loading}
						className="py-2 px-5 w-[100%] h-auto"
						type="primary"
						htmlType="submit"
					>
						Sign Up
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default SignUpAsUser;
