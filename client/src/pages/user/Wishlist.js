import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import {
  getProductsFromWishList,
  removeFromWishList
} from '../../functions/user';
import UserNav from '../../components/navbar/UserNav';
import Loading from '../../components/loading/Loading';
import ProductCard from '../../components/cards/ProductCard';

const Wishlist = () => {
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
    // eslint-disable-next-line
  }, []);

  const loadWishlist = () => {
    setLoading(true);
    user &&
      getProductsFromWishList(user.token)
        .then((res) => {
          setWishlist(res.data.wishlist);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
  };

  const handleRemove = (productId) => {
    removeFromWishList(user.token, productId)
      .then((res) => {
        loadWishlist();
        if (res.data.ok) {
          toast.success('Product removed from your Withlist.');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='container-fluid pt-2'>
      <div className='row'>
        <div className='col-md-3'>
          <UserNav />
        </div>
        <div className='col-md-9'>
          {loading ? (
            <Loading />
          ) : (
            <>
              <h4>Wish List</h4>
              <div className='row'>
                {wishlist &&
                  wishlist.map((p) => (
                    <div key={p._id} className='col-md-4 mb-2'>
                      <span
                        className='btn btn-sm float-right text-danger'
                        onClick={() => handleRemove(p._id)}>
                        <CloseCircleOutlined />
                      </span>
                      <ProductCard product={p} />
                    </div>
                  ))}

                {wishlist.length < 1 && (
                  <p>You don't have any products in your wishlist</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
