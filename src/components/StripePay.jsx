import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripePaymentComponent = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [clientSecret, setClientSecret] = useState("");
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		// Fetch the client secret from your backend
		fetch("http://localhost:5000/api/v1/university/application/651f0dad759cf097445ab22b/get-stripe-intent")
			.then((response) => response.json())
			.then((data) => setClientSecret(data.client_secret))
			.catch((error) => console.error("Error fetching client secret:", error));
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setProcessing(true);

		const result = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				// Add other payment method data here if needed
			},
		});

		if (result.error) {
			console.error("Payment failed:", result.error.message);
		} else {
			if (result.paymentIntent.status === "succeeded") {
				console.log("Payment successful!");
			}
		}

		setProcessing(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button type='submit' disabled={!stripe || processing}>
				{processing ? "Processing..." : "Pay"}
			</button>
		</form>
	);
};

export default StripePaymentComponent;
