import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCategories } from '../../functions/category';
import Loading from '../loading/Loading';

const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((res) => {
        setLoading(false);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <Link
        key={c._id}
        className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'
        to={`/category/${c.slug}`}>
        {c.name}
      </Link>
    ));

  return (
    <div className='container'>
      {loading ? <Loading /> : <div className='row'>{showCategories()}</div>}
    </div>
  );
};

export default CategoryList;
