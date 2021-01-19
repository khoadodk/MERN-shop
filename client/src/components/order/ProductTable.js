import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const ProductTable = ({ order }) => {
  return (
    <table className='table table-bordered text-center'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Count</th>
          <th scope='col'>Free Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p) => (
          <tr key={p._id}>
            <td>
              <b>{p.title}</b>
            </td>
            <td>{p.price}</td>
            <td>{p.count}</td>
            <td>
              {p.shipping === '' || p.shipping === 'no' ? (
                <CheckCircleOutlined className='text-info' />
              ) : (
                <CloseCircleOutlined className='text-secondary' />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
