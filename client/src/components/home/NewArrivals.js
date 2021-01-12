import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import { getProducts, getProductsCount } from '../../functions/product';

import ProductCard from '../../components/cards/ProductCard';
import LoadingCard from '../../components/cards/LoadingCard';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts('createdAt', 'desc', page)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const loadProductsCount = () =>
    getProductsCount().then((res) => setProductsCount(res.data));

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    loadProductsCount();
  }, []);

  return (
    <>
      <div className='container'>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className='row'>
            {products.map((p) => (
              <div key={p._id} className='col-md-4'>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='row'>
        <nav className='col-md-4 offset-md-4 text-center py-3'>
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
