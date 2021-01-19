import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getOrders, updateOrderStatus } from '../../functions/admin';
import AdminNav from '../../components/navbar/AdminNav';
import Loading from '../../components/loading/Loading';
import Orders from './order/Orders';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    user && loadOrders();
    // eslint-disable-next-line
  }, []);

  const loadOrders = () => {
    setLoading(true);
    getOrders(user.token)
      .then((res) => {
        setLoading(false);
        setOrders(res.data);
      })
      .catch((err) => {
        setLoading();
        console.log(err);
      });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    updateOrderStatus(user.token, orderId, orderStatus)
      .then((res) => {
        toast.success('Order status updated!');
      })
      .catch((err) => {
        toast.error('Fail to update the order status');
      });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNav />
        </div>
        <div className='col-md-6'>
          {loading ? (
            <Loading />
          ) : (
            <div className='mt-2'>
              <h4 className='text-center'>Orders</h4>
              <Orders orders={orders} handleStatusChange={handleStatusChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
