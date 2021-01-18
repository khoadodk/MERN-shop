import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import AdminNav from '../../../components/navbar/AdminNav';
import Loading from '../../../components/loading/Loading';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { getProductsByCount, deleteProduct } from '../../../functions/product';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
    // eslint-disable-next-line
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(10)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (_id) => {
    setLoading(true);
    deleteProduct(_id, user.token)
      .then((res) => {
        setLoading(false);
        loadAllProducts();
        toast.success(`${res.data.title} deleted.`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Fail to delete product.');
        console.log(err);
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
            <div className='row'>
              {products.map((p) => (
                <div key={p._id} className='col-md-4'>
                  <AdminProductCard product={p} handleRemove={handleRemove} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
