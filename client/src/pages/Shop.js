import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

import { fetchProductByFilter, getProductsByCount } from '../functions/product';
import Loading from '../components/loading/Loading';
import ProductCard from '../components/cards/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [isPrice, setIsPrice] = useState(false);

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  const fetchProducts = (arg) => {
    setLoading(true);
    fetchProductByFilter(arg)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  //   Load products by default
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  //   Load products on user search input
  useEffect(() => {
    if (text) {
      // set a delay to prevent search overload
      const delayed = setTimeout(() => {
        fetchProducts({ query: text });
      }, 300);
      return () => clearTimeout(delayed);
    } else {
      // return all product if there is no search query
      loadAllProducts();
    }
  }, [text]);

  // Load products on price search
  useEffect(() => {
    fetchProducts({ price });
  }, [isPrice]);

  const handleSlider = (value) => {
    console.log(value);
    // Clear query search
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    setPrice(value);
    setTimeout(() => {
      setIsPrice(!isPrice);
    }, 300);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <Menu defaultOpenKeys={['1', '2']} mode='inline'>
            <Menu.SubMenu
              key='1'
              title={
                <span className='h6'>
                  <DollarOutlined /> Price
                </span>
              }>
              <Slider
                className='ml-4 mr-4'
                tipFormatter={(v) => `$${v}`}
                range
                value={price}
                onChange={handleSlider}
                max='4999'
              />
            </Menu.SubMenu>
          </Menu>
        </div>
        <div className='col-md-9'>
          <h4 className='text-center mt-2'>Products</h4>
          {loading ? (
            <Loading />
          ) : (
            <>
              {products && products.length < 1 && (
                <div className='text-center'>No products found</div>
              )}
              <div className='row'>
                {products.map((p) => (
                  <div key={p._id} className='col-md-4 py-2'>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
