import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Loading from '../../../components/loading/Loading';
import AdminNav from '../../../components/navbar/AdminNav';

import {
  createCoupon,
  getCoupons,
  deleteCoupon
} from '../../../functions/coupon';

const CouponCreate = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCoupon({ name, expiry, discount, description }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        setDiscount('');
        setExpiry('');
        setDescription('');
        loadAllCoupons();
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Fail to create coupon.');
      });
  };

  const handleRemove = (couponId) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      deleteCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon deleted successfully`);
        })
        .catch((err) => console.log(err));
    }
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
            <div className='pt-2'>
              <h4>Create Coupon</h4>

              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  className='form-control'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  autoFocus
                  required
                  placeholder='Code'
                />
                <input
                  type='text'
                  className='form-control my-3'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                  placeholder='Description'
                />

                <input
                  type='text'
                  className='form-control my-3'
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  required
                  placeholder='Discount (%)'
                />

                <DatePicker
                  className='form-control'
                  selected={expiry}
                  value={expiry}
                  onChange={(date) => setExpiry(date)}
                  required
                  placeholderText='Expires On'
                />

                <button
                  type='submit'
                  className='btn btn-raised mt-5 float-right'>
                  Submit
                </button>
              </form>

              <br />

              <h4 className='text-center'>{coupons.length} Coupons</h4>

              <table className='table table-bordered text-center'>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Expiry</th>
                    <th scope='col'>Discount</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {coupons.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{c.description}</td>
                      <td>{new Date(c.expiry).toLocaleDateString()}</td>
                      <td>{c.discount}%</td>
                      <td>
                        <DeleteOutlined
                          onClick={() => handleRemove(c._id)}
                          className='text-danger pointer'
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponCreate;
