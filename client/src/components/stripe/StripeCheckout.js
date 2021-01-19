import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../functions/stripe';
import { Link } from 'react-router-dom';
import { Card, Image } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import logo from '../../images/logo.png';
import { createOrder, emptyUserCart } from '../../functions/user';

const StripeCheckout = () => {
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  useEffect(() => {
    user && loadClientKey();
    // eslint-disable-next-line
  }, []);

  const loadClientKey = () =>
    createPaymentIntent(user.token, coupon).then((res) => {
      const { clientSecret, cartTotal, totalAfterDiscount, payable } = res.data;
      setClientSecret(clientSecret);
      setCartTotal(cartTotal);
      setTotalAfterDiscount(totalAfterDiscount);
      setPayable(payable);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value
        }
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      // empty user cart from redux store and local storage
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          if (typeof window !== 'undefined') localStorage.removeItem('cart');
          dispatch({
            type: 'ADD_TO_CART',
            payload: []
          });
          dispatch({
            type: 'COUPON_APPLIED',
            payload: false
          });
        }
      });
      emptyUserCart(user.token);
    }
  };

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ''); // show error message
  };

  return (
    <>
      <p
        className={succeeded ? 'result-message mark' : 'result-message hidden'}>
        Payment Successful.{' '}
        <Link to='/user/history'>Check it in your purchase history.</Link>
      </p>

      {/* Order Summary*/}
      {/* With NO coupon */}
      {!succeeded && (
        <div className='text-center py-3'>
          {coupon && totalAfterDiscount ? (
            // With Coupon
            <>
              <h4 className='text-success'>
                You pay: ${totalAfterDiscount.toFixed(2)}
              </h4>
              <Card
                cover={
                  <Image
                    width={150}
                    src={logo}
                    style={{ marginBottom: '-48px', padding: '20px 0' }}
                  />
                }
                actions={[
                  <>
                    <DollarOutlined className='text-info' /> <br /> Total: $
                    {cartTotal}
                  </>,
                  <>
                    <CheckOutlined className='text-info' /> <br /> You save: $
                    {(cartTotal - payable / 100).toFixed(2)}
                  </>
                ]}></Card>
            </>
          ) : (
            <>
              <h4 className='text-success'>You pay: ${cartTotal.toFixed(2)}</h4>
              <Image width={150} src={logo} style={{ padding: '20px 0' }} />
            </>
          )}
        </div>
      )}

      <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className='stripe-button'
          disabled={processing || disabled || succeeded}>
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
          </span>
        </button>
        <br />
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
      </form>
    </>
  );
};

export default StripeCheckout;

const cartStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#32325d'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};
