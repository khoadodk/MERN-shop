import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import noImage from '../../images/no-image.png';
import ProductListItems from './ProductListItems';
import RatingModal from '../modals/RatingModal';
import { showAverage } from '../../functions/rating';
import { addToWishList } from '../../functions/user';

const { TabPane } = Tabs;

const SingleProduct = ({ product, handleChangeRating, rating }) => {
  const [tooltip, setTooltip] = useState('Add to Cart');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

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
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishList(user.token, product._id)
      .then((res) => {
        toast.success('Added to withlist');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='row'>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img src={i.url} key={i.public_id} alt={i.url} />
              ))}
          </Carousel>
        ) : (
          <img src={noImage} alt='product card cover' className='slider' />
        )}

        <Tabs type='card'>
          <TabPane tab='Description' key='1'>
            {description && description}
          </TabPane>
          <TabPane tab='More' key='2'>
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-5'>
        <h1 className='py-3 m-0 text-center text-primary mark'>{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className='text-center py-2'>
            <span>
              <StarRatings starDimension='2em' editing={false} /> (0)
            </span>
          </div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              {/* eslint-disable-next-line  */}
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className='text-info' /> <br /> Add to
                Cart
              </a>
            </Tooltip>,
            <>
              {/* eslint-disable-next-line  */}
              <a onClick={handleAddToWishlist} disabled={!user}>
                <HeartOutlined className='text-danger' /> <br />{' '}
                {!user ? 'Login to Add to Wishlist' : 'Add to Wishlist'}
              </a>
            </>,

            <RatingModal>
              <StarRatings
                rating={rating}
                starRatedColor='red'
                changeRating={handleChangeRating}
                numberOfStars={5}
                name={_id}
                isSelectable={true}
              />
            </RatingModal>
          ]}>
          <ProductListItems product={product} />
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
