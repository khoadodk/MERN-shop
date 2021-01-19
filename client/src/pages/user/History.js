import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import UserNav from '../../components/navbar/UserNav';
import { getOrders } from '../../functions/user';

const History = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    user && loadOrders();
    // eslint-disable-next-line
  }, []);

  const loadOrders = () => {
    getOrders(user.token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showOrderInTable = (order) => (
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

  const showPaymentInfo = (order) => (
    <>
      <p>
        {' '}
        <span>Order Id: {order.paymentIntent.id}</span>
        {' / '}
        <span>
          Amount:{' / '}
          {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </span>
        {' / '}
        <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
        {' / '}
        <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
        {' / '}
        <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
        {' / '}
        <span>
          Ordered on:{' / '}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
        {' / '}
        <span className='badge bg-primary text-white py-1'>
          STATUS: {order.orderStatus}
        </span>
      </p>
    </>
  );

  const showOrders = () =>
    orders.map((order) => (
      <div key={order._id} className='mt-3 card'>
        {showPaymentInfo(order)}
        {showOrderInTable(order)}
        <div className='row'>
          <div className='col text-center'>
            <p>PDF download</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className='container-fluid pt-2'>
      <div className='row'>
        <div className='col-md-3'>
          <UserNav />
        </div>
        <div className='col-md-6'>{orders && showOrders()}</div>
      </div>
    </div>
  );
};

export default History;
