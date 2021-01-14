import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SingleProduct from '../components/cards/SingleProduct';
import { getProduct, getRelated, postProductStar } from '../functions/product';
import Loading from '../components/loading/Loading';
import ProductCard from '../components/cards/ProductCard';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [related, setRelated] = useState([]);

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
        getRelated(res.data._id).then((res) => setRelated(res.data));
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
        <>
          <div className='mb-5'>
            <SingleProduct
              product={product}
              handleChangeRating={handleChangeRating}
              rating={rating}
            />
          </div>
          <hr />
          <h4 className='text-center py-3'>Related Products</h4>
          <div className='row pb-3'>
            {related.length ? (
              related.map((r) => (
                <div className='col-md-4' key={r._id}>
                  <ProductCard product={r} />
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
