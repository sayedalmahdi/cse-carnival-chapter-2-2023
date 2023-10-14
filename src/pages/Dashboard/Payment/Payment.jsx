import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const Payment = () => {
  const paymentservice = useLoaderData();
  const bill = parseFloat(paymentservice.rate);
  const price = parseFloat(bill.toFixed(2));
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm paymentservice={paymentservice} price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
