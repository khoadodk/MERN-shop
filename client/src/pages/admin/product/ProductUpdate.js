import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AdminNav from '../../../components/navbar/AdminNav';
import Loading from '../../../components/loading/Loading';

import { getProduct, updateProduct } from '../../../functions/product';
import ProductForm from '../../../components/forms/ProductForm';

const ProductUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});

  const { _id } = useParams();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(_id).then((res) => {
      setValues(res.data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    updateProduct(_id, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} updated!`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(`Fail to update product!`);
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
              <h4>Update Product</h4>
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

export default ProductUpdate;
