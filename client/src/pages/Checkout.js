import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

import {
  getUserCart,
  emptyUserCart,
  saveAddress,
  applyCoupon
} from '../functions/user';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  // make sure save address efore placing order
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState({});
  const [totalAfterDiscount, setTotalAfterDiscount] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    user && loadUserCart();
  }, [user]);

  const loadUserCart = () => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => console.log(err));
  };

  const saveAddressToDb = () => {
    saveAddress(address, user.token)
      .then((res) => {
        if (res.data.ok) {
          setIsAddressSaved(true);
          toast.success('Address updated successfully!');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Fail to update the address.');
      });
  };

  const emptyCart = () => {
    // remove cart from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    // remove cart from redux store
    dispatch({
      type: 'ADD_TO_CART',
      payload: []
    });
    // remove cart from server
    emptyUserCart(user.token)
      .then((res) => {
        setProducts([]);
        setTotal(0);
        toast.success('Cart is empty!');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Fail to empty the cart! Please try again.');
      });
  };

  const handleApplyCoupon = () => {
    applyCoupon(user.token, coupon)
      .then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
          dispatch({
            type: 'COUPN_APPLIED',
            payload: true
          });
          return;
        }
        setTotalAfterDiscount(res.data);
        toast.success('Coupon Applied!');
        // update redux store
        dispatch({
          type: 'COUPN_APPLIED',
          payload: true
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showApplyCoupon = () => (
    <div className='col-md-4 offset-md-8'>
      <input
        onChange={(e) => setCoupon(e.target.value)}
        type='text'
        className='form-control'
        placeholder='Coupon code'
      />
      <Button
        type='secondary'
        className='float-right'
        onClick={handleApplyCoupon}>
        Apply
      </Button>
    </div>
  );

  return (
    <div className='row pt-2'>
      <div className='col-md-6'>
        <div className='pb-5'>
          <h4 className='text-center'>Delivery Address</h4>
          <ReactQuill theme='snow' value={address} onChange={setAddress} />
          <Button
            type='primary'
            className='float-right my-2'
            onClick={saveAddressToDb}>
            Save
          </Button>
        </div>
        <hr />
        {showApplyCoupon()}
      </div>

      <div className='col-md-6'>
        <h4>
          Order Summary (<span>{products && products.length} Products</span>)
        </h4>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.title} x {p.count} = {p.price * p.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: ${total}</p>

        {totalAfterDiscount > 0 && (
          <p className='my-3 py-1'>
            Total After Discount:{' '}
            <span className='bg-success'>${totalAfterDiscount}</span>
          </p>
        )}

        <div className='row'>
          <div className='col-md-6'>
            <Button
              type='primary'
              disabled={!isAddressSaved || !products.length}>
              Place Order
            </Button>
          </div>
          <div className='col-md-6'>
            <Button type='primary' onClick={emptyCart}>
              Empty Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
