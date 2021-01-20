import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';

import Invoice from '../../components/order/Invoice';
import UserNav from '../../components/navbar/UserNav';
import { getOrders } from '../../functions/user';
import PaymentInfo from '../../components/order/PaymentInfo';
import ProductTable from '../../components/order/ProductTable';

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

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName='invoice.pdf'
      className='btn btn-sm btn-outline-primary'>
      Download PDF
    </PDFDownloadLink>
  );

  const showOrders = () =>
    orders.map((order, i) => (
      <div key={i} className='mt-3 card'>
        <PaymentInfo order={order} />
        <ProductTable order={order} />

        <div className='text-center'>{showDownloadLink(order)}</div>
      </div>
    ));

  return (
    <div className='container-fluid pt-2'>
      <div className='row'>
        <div className='col-md-3'>
          <UserNav />
        </div>
        <div className='col-md-6'>
          <h4 className='text-center'>Order History</h4>
          {orders && showOrders()}
          {orders.length < 1 && (
            <p className='text-center'>You don't have any orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
