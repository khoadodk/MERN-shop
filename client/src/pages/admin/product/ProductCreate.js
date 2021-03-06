import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import AdminNav from '../../../components/navbar/AdminNav';
import Loading from '../../../components/loading/Loading';

import { createProduct } from '../../../functions/product';

import ProductForm from '../../../components/forms/ProductForm';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: []
};

const ProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    createProduct(values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} created!`);
        setValues({ ...initialState, images: [] });
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          console.log(err.response);
          toast.error(err.response.data);
        } else {
          toast.error(`Fail to create product!`);
        }
      });
  };

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
            <div>
              <h4>Create Product</h4>

              <ProductForm
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
