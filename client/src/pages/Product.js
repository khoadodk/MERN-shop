import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SingleProduct from '../components/cards/SingleProduct';
import { getProduct, postProductStar } from '../functions/product';
import Loading from '../components/loading/Loading';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const { _id } = match.params;
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSingleProduct();
  }, [_id]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setRating(existingRatingObject.star);
    }
  }, [product, user]);

  const loadSingleProduct = () => {
    setLoading(true);
    getProduct(_id)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleChangeRating = (newRating, _id) => {
    setRating(newRating);
    postProductStar(newRating, _id, user.token);
  };

  return (
    <div className='container-fluid'>
      {loading ? (
        <Loading />
      ) : (
        <SingleProduct
          product={product}
          handleChangeRating={handleChangeRating}
          rating={rating}
        />
      )}
    </div>
  );
};

export default Product;
