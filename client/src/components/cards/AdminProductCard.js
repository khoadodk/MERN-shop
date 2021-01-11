import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import noImage from '../../images/no-image.png';

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, _id } = product;

  return (
    <Card
      cover={
        <img
          src={images.length ? images[0].url : noImage}
          style={{ height: '150px', objectFit: 'contain' }}
          className='p-1'
        />
      }
      actions={[
        <Link to={`/admin/product/${_id}`}>
          <EditOutlined />
        </Link>,
        <DeleteOutlined onClick={() => handleRemove(_id)} />
      ]}>
      <Card.Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
