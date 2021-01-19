import React from 'react';
import PaymentInfo from '../../../components/order/PaymentInfo';
import ProductTable from '../../../components/order/ProductTable';

const Orders = ({ orders, handleStatusChange }) => {
  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className='card mb-2'>
          <div className='row'>
            <div className="col-md-8">
            <PaymentInfo order={order} />
            </div>
            <div className="col-md-4">
                Delivery Status:
            <select
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className='form-control text-primary'
              defaultValue={order.orderStatus}
              name='status'>
              <option value='Not Processed'>Not Processed</option>
              <option value='Processing'>Processing</option>
              <option value='Dispatched'>Dispatched</option>
              <option value='Cancelled'>Cancelled</option>
              <option value='Completed'>Completed</option>
            </select>
            </div>
          </div>

          <ProductTable order={order} />
        </div>
      ))}
    </>
  );
};

export default Orders;
