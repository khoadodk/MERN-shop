import React, { useState, useEffect } from 'react';
import SingleProduct from '../components/cards/SingleProduct';
import { getProduct } from '../functions/product';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  const { _id } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [_id]);

  const loadSingleProduct = () => {
    getProduct(_id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className='container-fluid'>
      <SingleProduct product={product} />
    </div>
  );
};

export default Product;
