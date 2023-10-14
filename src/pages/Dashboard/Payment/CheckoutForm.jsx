import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";

const CheckoutForm = ({ paymentservice, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  // console.log(user)
  useEffect(() => {
    // console.log(price);
    if (price > 0) {
      axios.post("http://localhost:5000/create-payment-intent", { price })
        .then((res) => {
          // console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    // console.log(card)

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log('payment method', paymentMethod)
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }
    // console.log(paymentIntent)
    setProcessing(false);

    if (paymentIntent?.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        instructorName: paymentservice.name,
        consultantEmail: paymentservice.consultantEmail,
      };
      axios.post("http://localhost:5000/payments", payment).then((res) => {
        if (res.data.insertedId) {
          fetch(
            `http://localhost:5000/users/customer/paidservices/${
              paymentservice._id
            }?paymentStatus=${"paid"}`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.modifiedCount) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `Login Successful.`,
                  showConfirmButton: false,
                  timer: 800,
                });
              }
            });
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${cardError}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="">
      <div>
        <div className="card w-2/3 mx-auto bg-base-100 dark:bg-slate-700 shadow-xl flex-row border-2 p-1 border-[#e2136e] rounded">
          <img className="w-96 h-52 rounded" alt="Shoes" />
          <div className="card-body dark:text-white text-[14px]">
            <p>Consultant: {paymentservice.name}</p>
            <p>Contact: </p>
            <div className="card-actions justify-end items-center">
              <p className="text-xl font-semibold">${price}</p>
            </div>
          </div>
        </div>
      </div>
      <form
        className="w-1/2 mt-5 mx-auto border-2 p-5 rounded bg-slate-50 border-[#e2136e]"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#020406",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex items-center justify-between">
          <button
            className="btn bg-green-600 text-white hover:text-black btn-sm mt-4"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay Now
          </button>
          {transactionId && (
            <p className="text-blue-500 text-lg mt-2">
              Transaction ID:{" "}
              <span className="text-black">{transactionId}</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
