import React, { useEffect, useState } from 'react';
import Loading from '../components/loading/Loading';
import ProductCard from '../components/cards/ProductCard';
import { getSubCategory } from '../functions/subcategory';

const SubCategory = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { _id } = match.params;

  useEffect(() => {
    setLoading(true);
    getSubCategory(_id)
      .then((res) => {
        setLoading(false);
        setSub(res.data.subcategory);
        setProducts(res.data.products);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [_id]);

  return (
    <div className='container-fluid'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            <h4 className='text-center my-5 display-4 jumpotron'>
              {products.length} products in <strong>{sub.name}</strong>{' '}
              subcategory
            </h4>
          </div>
          <div className='row'>
            {products.map((p) => (
              <div className='col-md-4' key={p._id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SubCategory;
