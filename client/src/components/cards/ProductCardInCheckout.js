import React from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'antd';
import { toast } from 'react-toastify';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import noImage from '../../images/no-image.png';

const ProductCardInCheckout = ({ p }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    //   prevent value to go lower than 1
    let count = e.target.value < 1 ? 1 : e.target.value;
    // warning if count is higher than quantity
    if (count > p.quantity) {
      toast.error(`Maximum available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id == p._id) cart[i].count = count;
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart
      });
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id == p._id) cart.splice(i, 1);
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          {p.images.length ? (
            <Image width={100} src={p.images[0].url} />
          ) : (
            <Image width={100} src={noImage} />
          )}
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.category.name}</td>
        <td>
          <input
            type='number'
            className='form-control col-md-2 offset-md-5'
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td>
          {p.shipping === '' || p.shipping === 'no' ? (
            <CheckCircleOutlined className='text-info' />
          ) : (
            <CloseCircleOutlined className='text-secondary' />
          )}
        </td>
        <td>
          {' '}
          <DeleteOutlined
            onClick={handleRemove}
            className='text-danger pointer'
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
