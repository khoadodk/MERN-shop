import React from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import StarRatings from 'react-star-ratings';

import noImage from '../../images/no-image.png';
import ProductListItems from './ProductListItems';
import RatingModal from '../modals/RatingModal';
import { showAverage } from '../../functions/rating';

const { TabPane } = Tabs;

const SingleProduct = ({ product, handleChangeRating, rating }) => {
  const { title, description, images, _id } = product;
  console.log(product);
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
            <>
              <ShoppingCartOutlined className='text-info' /> Add to Cart
            </>,
            <Link to=''>
              <HeartOutlined className='text-danger' /> <br /> Add to Wishlist
            </Link>,
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
