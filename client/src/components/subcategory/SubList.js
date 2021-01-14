import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getSubCategories } from '../../functions/subcategory';
import Loading from '../loading/Loading';

const SubList = () => {
  const [loading, setLoading] = useState(false);
  const [sub, setSub] = useState([]);

  useEffect(() => {
    setLoading(true);
    getSubCategories()
      .then((res) => {
        setLoading(false);
        setSub(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showSub = () =>
    sub.map((s) => (
      <Link
        to={`/subcategory/${s._id}`}
        key={s._id}
        className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
        {s.name}
      </Link>
    ));

  return (
    <div className='container'>
      {loading ? <Loading /> : <div className='row'>{showSub()}</div>}
    </div>
  );
};

export default SubList;
