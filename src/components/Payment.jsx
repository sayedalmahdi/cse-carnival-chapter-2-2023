import { httpsCallable } from "firebase/functions";
import React from "react";
import { functions } from "../firebase";
import { useStateValue } from "../state/StateProvider";
import { useState } from "react";
import { Button, message } from "antd";

const createPaymentSession = httpsCallable(functions, "createPaymentSession");

const Payment = () => {
	const [loading, setLoading] = useState(false);
	const [{ user }] = useStateValue();

	const handlePayment = async () => {
		setLoading(true);
		try {
			const res = await createPaymentSession({ guideId: "b" });

			console.log(res.data);
			if (res.data.ok) window.location.href = res.data.url;
		} catch (e) {
			message.error("Something went wrong");
			console.error(e);
			setLoading(false);
		}
	};
	return (
		<div>
			<Button onClick={handlePayment}>Pay</Button>
		</div>
	);
};

export default Payment;
