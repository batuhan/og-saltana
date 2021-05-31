import { Button, Input, Stack } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { formatAmountForDisplay } from "../";
import * as config from "../config";
import { useMutation } from "react-query";

const CARD_OPTIONS = {
  iconStyle: "solid" as const,
  style: {
    base: {
      iconColor: "#6772e5",
      color: "#6772e5",
      fontWeight: "500",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#6772e5",
      },
    },
    invalid: {
      iconColor: "#ef2961",
      color: "#ef2961",
    },
  },
};

const ElementsForm = ({ cartTotal }) => {
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
    cardholderName: "",
  });
  const [payment, setPayment] = useState({ status: "initial" });
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const {} = useMutation((data) => )

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case "processing":
      case "requires_payment_method":
      case "requires_confirmation":
        return <h2>Processing...</h2>;

      case "requires_action":
        return <h2>Authenticating...</h2>;

      case "succeeded":
        return <h2>Payment Succeeded 🥳</h2>;

      case "error":
        return (
          <>
            <h2>Error 😭</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        );

      default:
        return null;
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return;
    setPayment({ status: "processing" });

    // Create a PaymentIntent with the specified amount.
    const response = await fetchPostJSON("/api/payment_intents", {
      amount: input.customDonation,
    });
    setPayment(response);

    if (response.statusCode === 500) {
      setPayment({ status: "error" });
      setErrorMessage(response.message);
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements!.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentIntent } = await stripe!.confirmCardPayment(
      response.client_secret,
      {
        payment_method: {
          card: cardElement!,
          billing_details: { name: input.cardholderName },
        },
      },
    );

    if (error) {
      setPayment({ status: "error" });
      setErrorMessage(error.message ?? "An unknown error occured");
    } else if (paymentIntent) {
      setPayment(paymentIntent);
    }
  };

  return (
    <chakra.form width="full" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Input
          placeholder="E-mail address"
          _placeholder={{
            color: "gray.500",
          }}
        />
        <Input
          placeholder="Cardholder Name"
          _placeholder={{
            color: "gray.500",
          }}
        />
        <CardElement
          options={CARD_OPTIONS}
          onChange={(e) => {
            if (e.error) {
              setPayment({ status: "error" });
              setErrorMessage(e.error.message ?? "An unknown error occured");
            }
          }}
        />
      </Stack>

      <Button
        mt="3"
        isFullWidth
        fontSize="sm"
        fontWeight="bold"
        colorScheme="gray"
        disabled={
          !["initial", "succeeded", "error"].includes(payment.status) || !stripe
        }
      >
        Pay {formatAmountForDisplay(cartTotal, config.CURRENCY)}
      </Button>

      <PaymentStatus status={payment.status} />
    </chakra.form>
  );
};

export default ElementsForm;
