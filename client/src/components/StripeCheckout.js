import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import {CheckOutlined, DollarOutlined} from '@ant-design/icons'
import { Card } from "antd";
import { createOrder, emptyUserCart } from "../functions/user";


const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { user,coupan } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);


  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupan).then((res) => {
      console.log("create payment intent", res)
      setClientSecret(res.data.clientSecret)
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payble);
    }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    console.log("6545456654456654456564",clientSecret);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      // empty user cart from redux store and local storage
      createOrder(payload,user.token).then((res)=>{
        if(res.data.ok){
          if(typeof window!=="undefined") localStorage.removeItem("cart");
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          // empty cart from database
          emptyUserCart(user.token);        }
      })
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message :"")
  };

  const cartStyle = {
    style: {
      base: {
        color: "red",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>

     {!succeeded &&  (<div>
          {coupan && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $ ${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
     )
    }
  <div className="text-center pb-5">
        <Card
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable : $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>


      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button btn-primary btn"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br/>
        {error && (
          <div className="card-error text-dark" role="alert"> 
          {error}
           </div>
        )}
      </form>
    </>
  );
};

export default StripeCheckout;
