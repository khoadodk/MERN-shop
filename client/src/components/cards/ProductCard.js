import React from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import noImage from '../../images/no-image.png';

const ProductCard = ({ product }) => {
  const { title, description, images, _id } = product;

  return (
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
        <Tooltip title='Add to Cart'>
          <Link to={`/cart`}>
            <ShoppingCartOutlined className='text-info' />
          </Link>
        </Tooltip>
      ]}>
      <Card.Meta
        title={title}
        description={`${description && description.substring(0, 40)}`}
      />
    </Card>
  );
};

export default ProductCard;
