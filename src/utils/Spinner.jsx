import { Spin } from "antd";

const Spinner = () => {
	return (
		<div className='flex justify-center items-center min-w-screen min-h-screen'>
			<Spin size='large' tip='Just a moment...' />
		</div>
	);
};

export default Spinner;
