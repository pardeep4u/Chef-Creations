import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";

function StripeContainer() {
  const PUBLIC_KEY =
    "pk_test_51NLjecSHTnevToybRtOjP9zF9BwP0xjbLThQ2EDNASnerI7sMFon6EcbV87pkRXKaHJGQvpVP65DSzRgStqp1ZXv00olChSr1g";
  const stripeTestPromise = loadStripe(PUBLIC_KEY);

  return (
    <Elements stripe={stripeTestPromise}>
      <Payment />
    </Elements>
  );
}

export default StripeContainer;
