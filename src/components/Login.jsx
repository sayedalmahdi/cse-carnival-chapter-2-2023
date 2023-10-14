import React from "react";
import { Button, Modal, Form, Input, Checkbox, message } from "antd";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useStateValue } from "../state/StateProvider";

const Login = () => {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const onFinish = async (values) => {
		try {
			const auth = getAuth();
			signInWithEmailAndPassword(auth, values.email, values.password);
			message.success("Login successful!");
			handleCancel();
		} catch (error) {
			console.error("Error signing in: ", error);
			message.error("Error signing in.");
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button type='primary' onClick={showModal}>
				Open Modal
			</Button>
			<Modal
				className='custom-modal'
				title={<h3>Login</h3>}
				visible={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					requiredMark={false}
					layout='vertical'
					name='basic'
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
				>
					<Form.Item
						label='Email'
						name='email'
						rules={[
							{
								required: true,
								message: "Please input your email!",
							},
							{
								type: "email",
								message: "Please enter a valid email address",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Password'
						name='password'
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name='remember'
						valuePropName='checked'
						wrapperCol={{
							offset: 0,
							span: 24,
						}}
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' block>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Login;
