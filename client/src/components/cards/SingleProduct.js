import React from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import noImage from '../../images/no-image.png';
import ProductListItems from './ProductListItems';

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, description, images } = product;

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
        <h1 className='py-1 text-center text-primary'>{title}</h1>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className='text-info' /> Add to Cart
            </>,
            <Link to=''>
              <HeartOutlined className='text-danger' /> <br /> Add to Wishlist
            </Link>
          ]}>
          <ProductListItems product={product} />
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
