import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import styled from "styled-components";

const Button = styled.button`
  display: block;
  font-size: 16px;
  width: calc(100% - 30px);
  height: 40px;
  margin: 40px 15px 0;
  background-color: #f6a4eb;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #ffb9f6;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 100ms ease-in-out;
  will-change: transform, background-color, box-shadow;
  border: none;
`;

const Form = styled.form`
  margin-top: 200px;
`;

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

function Payment() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();

  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const id = paymentMethod.id;
        const response = await axios.post("http://localhost:4000/pay", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("payment succes");
          setSuccess(true);
        } else {
          console.log("error occured");
        }
      } catch (error) {}
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <Form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS}></CardElement>
            </div>
          </fieldset>
          <Button>Pay</Button>
        </Form>
      ) : (
        <h2>just just did an payment</h2>
      )}
    </>
  );
}

export default Payment;
