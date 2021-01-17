import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

import { getUserCart, emptyUserCart, saveAddress } from '../functions/user';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  // make sure save address efore placing order
  const [isAddressSaved, setIsAddressSaved] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    user &&
      getUserCart(user.token)
        .then((res) => {
          setProducts(res.data.products);
          setTotal(res.data.cartTotal);
        })
        .catch((err) => console.log(err));
  }, []);

  const saveAddressToDb = () => {
    saveAddress(user.token)
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

  return (
    <div className='row pt-2'>
      <div className='col-md-6'>
        <h4 className='text-center'>Delivery Address</h4>
        <ReactQuill theme='snow' value={address} onChange={setAddress} />
        <Button
          type='primary'
          className='float-right my-2'
          onClick={saveAddressToDb}>
          Save
        </Button>
      </div>

      <div className='col-md-6'>
        <h4>Order Summary</h4>
        <hr />
        <p>{products.length} Products</p>
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
