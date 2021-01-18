import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import '../stripe.css';

import StripeCheckout from '../components/stripe/StripeCheckout';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className='container py-3 text-center'>
      <h4>Complete Your Purchase</h4>
      <Elements stripe={stripePromise}>
        <div className='col-md-8 offset-md-2'>
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
