import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import {
  EyeOutlined,
  ShoppingCartOutlined,
  FrownOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import StarRating from 'react-star-ratings';
import { useDispatch } from 'react-redux';

import noImage from '../../images/no-image.png';
import { showAverage } from '../../functions/rating';

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState('Add to Cart');

  const dispatch = useDispatch();

  const { title, description, images, _id } = product;

  const handleAddToCart = () => {
    setTooltip('Added');
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.push({
        ...product,
        count: 1
      });
      // Remove duplicates
      const uniqueCart = cart.filter((obj, index) => {
        const _obj = JSON.stringify(obj);
        return (
          index ===
          cart.findIndex((obj) => {
            return JSON.stringify(obj) === _obj;
          })
        );
      });
      localStorage.setItem('cart', JSON.stringify(uniqueCart));

      dispatch({
        type: 'ADD_TO_CART',
        payload: uniqueCart
      });

      dispatch({
        type: 'SET_VISIBLE',
        payload: true
      });
    }
  };

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className='text-center py-2'>
          <span>
            <StarRating starDimension='2em' editing={false} /> (0)
          </span>
        </div>
      )}

      <Card
        cover={
          <img
            src={images.length ? images[0].url : noImage}
            style={{ height: '200px', objectFit: 'cover' }}
            alt='product card cover'
            className='p-1'
          />
        }
        actions={[
          <Tooltip title='Details'>
            <Link to={`/product/${_id}`}>
              <EyeOutlined className='text-info' />
            </Link>
          </Tooltip>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              {product.quantity < 1 ? (
                <span className='text-danger'>Out of Stock</span>
              ) : (
                <ShoppingCartOutlined className='text-info' />
              )}
            </a>
          </Tooltip>
        ]}>
        <Card.Meta
          title={title}
          description={`${description && description.substring(0, 40)}`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
