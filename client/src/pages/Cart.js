import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';

const Cart = () => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  const saveOrderToDb = () => {};
  console.log(cart);

  const showCartItems = () => (
    <table className='table table-bordered text-center'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Brand</th>
          <th scope='col'>Count</th>
          <th scope='col'>Free Shipping</th>
          <th scope='col'>Remove</th>
        </tr>
      </thead>

      {cart && cart.map((p) => <ProductCardInCheckout p={p} key={p._id} />)}
    </table>
  );

  return (
    <div className='container-fluid pt-2'>
      <div className='row'>
        <div className='col-md-8'>
          {!cart.length ? (
            <p className='text-center pt-2'>
              No products in cart. <Link to='/shop'>Continue Shopping</Link>
            </p>
          ) : (
            <div>
              <h4 className='text-center'>Total {cart.length} items in Cart</h4>
              {showCartItems()}
            </div>
          )}
        </div>
        <div className='col-md-4'>
          <h4>Order Summary</h4>
          <hr />
          {cart &&
            cart.map((c, i) => (
              <div key={i}>
                <p>
                  {c.title} x {c.count} = <b>${c.price * c.count}</b>
                </p>
              </div>
            ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <Button
              type='primary'
              onClick={saveOrderToDb}
              disabled={!cart.length}>
              Process to checkout
            </Button>
          ) : (
            <Button type='primary'>
              <Link to={{ pathname: '/login', state: { from: 'cart' } }}>
                Login to Checkout
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
