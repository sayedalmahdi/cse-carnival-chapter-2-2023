import React from "react";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { Typography } from "antd";
import { ArrowLeftOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Title } = Typography;
import { Avatar } from "antd";

import { AutoComplete, Cascader, Checkbox, Col, InputNumber, Row, Select } from "antd";
const { Option } = Select;
import SignupSvg from "../assets/signup.svg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUpAsUser = () => {
	const [loading, setLoading] = useState(false);
	const [fileUrl, setFileUrl] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const navigate = useNavigate();

	const handleFileUpload = async (file, fType = "avatar") => {
		const storageRef = ref(storage, "images/" + file.name);

		try {
			const snapshot = await uploadBytes(storageRef, file);
			const url = await getDownloadURL(snapshot.ref);
			fType === "avatar" ? setAvatar(url) : setFileUrl(url);

			console.log("File uploaded successfully!");
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	const handleRegister = async (values) => {
		setLoading(true);
		try {
			const { email, password } = values;
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const uid = userCredential.user.uid;
			const user = {
				...values,
				email,
				role: "guide",
				nid: fileUrl,
        approved: false,
        avatar
			};

			if (user.password) delete user.password;
			if (user.confirm) delete user.confirm;

			console.log(user);
			console.log(values);

			await setDoc(doc(db, "users", uid), user);
			message.success("Signup successful!");
			navigate("/chat");
		} catch (error) {
			console.error("Error signing up: ", error);
			message.error("Error signing up.");
		} finally {
			setLoading(false);
		}
	};

	const formItemLayout = {
		labelCol: {
			xs: {
				span: 24,
			},
			sm: {
				span: 8,
			},
		},
		wrapperCol: {
			xs: {
				span: 24,
			},
			sm: {
				span: 16,
			},
		},
	};
	const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 0,
			},
			sm: {
				span: 16,
				offset: 8,
			},
		},
	};

	const [form] = Form.useForm();

	const [autoCompleteResult, setAutoCompleteResult] = useState([]);
	const onWebsiteChange = (value) => {
		if (!value) {
			setAutoCompleteResult([]);
		} else {
			setAutoCompleteResult([".com", ".org", ".net"].map((domain) => `${value}${domain}`));
		}
	};

	const districts = ["District 1", "District 2", "District 64"];

	return (
		<div className='flex items-center justify-center' style={{ minHeight: "100vh" }}>
			<div className='container flex' style={{ height: "100%" }}>
				<div
					className='w-1/2 flex items-center justify-center overscroll-none'
					style={{
						position: "fixed",
						left: 0,
						height: "100vh",
						backgroundColor: "#6f7880   ",
					}}
				>
					<div style={{ top: 30, left: 50, position: "absolute" }}>
						<div style={{ fontSize: "16px", color: "white" }} onClick={() => navigate("/")}>
							<ArrowLeftOutlined /> Go Back
						</div>
					</div>
					<img src={SignupSvg} alt='' width={400} />
				</div>
				<div
					className='w-1/2 bg-gray-100 p-4 flex flex-col items-center justify-center'
					style={{
						overflowY: "auto",

						padding: "20px",
						marginLeft: "50%",
					}}
				>
					<Title style={{ marginBottom: 30 }} level={2}>
						Apply as a guide
					</Title>

					<Form
						requiredMark={false}
						{...formItemLayout}
						form={form}
						name='register'
						style={{
							maxWidth: 600,
						}}
						scrollToFirstError
						onFinish={handleRegister}
					>
						<div className='flex justify-center self-center'>
							<Upload
								name='avatar'
								listType='picture-circle'
								className='avatar-uploader'
								showUploadList={false}
								beforeUpload={(file) => {
									handleFileUpload(file);
									return false; // Prevent default upload behavior
								}} //
							>
								{avatar ? <img src={avatar} alt='avatar' style={{ width: "100%" }} /> : uploadButton}
							</Upload>
						</div>
						<Form.Item
							name='name'
							label='Full Name'
							rules={[
								{
									required: true,
									message: "Please provide you name!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name='email'
							label='E-mail'
							rules={[
								{
									type: "email",
									message: "The input is not valid E-mail!",
								},
								{
									required: true,
									message: "Please input your E-mail!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name='password'
							label='Password'
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
								{
									min: 6,
									message: "Password must be at least 6 characters",
								},
							]}
							hasFeedback
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							name='confirm'
							label='Confirm Password'
							dependencies={["password"]}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Please confirm your password!",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("The new password that you entered do not match!"));
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							name='residence'
							label='Address'
							rules={[
								{
									required: true,
									message: "Please select your address!",
								},
							]}
						>
							<Input
								style={{
									width: "100%",
								}}
							/>
						</Form.Item>

						<Form.Item
							name='phone'
							label='Phone Number'
							rules={[
								{
									required: true,
									message: "Please input your phone number!",
								},
							]}
						>
							<Input
								style={{
									width: "100%",
								}}
							/>
						</Form.Item>

						<Form.Item name='intro' label='Intro'>
							<Input.TextArea showCount maxLength={100} />
						</Form.Item>

						<Form.Item
							name='gender'
							label='Gender'
							rules={[
								{
									required: true,
									message: "Please select gender!",
								},
							]}
						>
							<Select placeholder='select your gender'>
								<Option value='male'>Male</Option>
								<Option value='female'>Female</Option>
							</Select>
						</Form.Item>

						<Form.Item
							name='area'
							label='Area'
							rules={[
								{
									required: true,
									message: "Please select your area!",
								},
							]}
						>
							<Select mode='multiple' placeholder='Select your area'>
								{districts.map((district) => (
									<Option key={district} value={district}>
										{district}
									</Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item
							name='nid'
							label='National ID'
							valuePropName='fileList'
							getValueFromEvent={(e) => e.fileList}
							extra='Please upload a scanned copy of your National ID.'
							rules={[
								{
									required: true,
									message: "Please upload your National ID!",
								},
							]}
						>
							<Upload
								name='nid'
								action='https://example.com/upload' // Specify your upload endpoint here
								listType='text'
								beforeUpload={(file) => {
									handleFileUpload(file, (fType = "kyc"));
									return false; // Prevent default upload behavior
								}} // Returning false means prevent automatic upload, you can handle upload manually
							>
								<Button icon={<UploadOutlined />}>Upload National ID</Button>
							</Upload>
						</Form.Item>

						<Form.Item
							name='rate'
							label='Consultation Rate'
							rules={[
								{
									required: true,
									message: "Please input your preferred rate!",
								},
							]}
						>
							<Input
								type='number'
								style={{
									width: "100%",
								}}
							/>
						</Form.Item>

						<Form.Item
							name='agreement'
							valuePropName='checked'
							rules={[
								{
									validator: (_, value) =>
										value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")),
								},
							]}
							{...tailFormItemLayout}
						>
							<Checkbox>
								I have read the <a href=''>agreement</a>
							</Checkbox>
						</Form.Item>
						<Form.Item {...tailFormItemLayout}>
							<Button disabled={loading} loading={loading} type='primary' htmlType='submit'>
								Register
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default SignUpAsUser;

const uploadButton = (
	<div>
		<PlusOutlined />
		<div
			style={{
				marginTop: 8,
			}}
		>
			Avatar
		</div>
	</div>
);
