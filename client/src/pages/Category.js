import React, { useEffect, useState } from 'react';
import { getCategory } from '../functions/category';
import Loading from '../components/loading/Loading';
import ProductCard from '../components/cards/ProductCard';

const Category = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug)
      .then((res) => {
        setLoading(false);
        setCategory(res.data.category);
        setProducts(res.data.products);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container-fluid'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            <h4 className='text-center my-5 display-4 jumpotron'>
              {products.length} products in <strong>{category.name}</strong>{' '}
              category
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

export default Category;
