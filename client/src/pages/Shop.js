import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider, Checkbox } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined
} from '@ant-design/icons';

import { fetchProductByFilter, getProductsByCount } from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubCategories } from '../functions/subcategory';
import Loading from '../components/loading/Loading';
import ProductCard from '../components/cards/ProductCard';
import Star from '../components/star/Star';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [isPrice, setIsPrice] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [, setStar] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [, setSub] = useState('');

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  // Initial Fetch
  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubCategories().then((res) => setSubcategories(res.data));
    // eslint-disable-next-line
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
  }, [price, isPrice]);

  const handleSlider = (value) => {
    // Clear query search
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar('');
    setSub('');

    setTimeout(() => {
      setIsPrice(!isPrice);
    }, 300);
  };

  // load products on category search
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className='pb-2 pl-4 pr-4'
          value={c._id}
          name='category'
          checked={categoryIds.includes(c._id)}>
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    setPrice([0, 0]);
    setStar('');
    setSub('');

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  // Load products on star rating
  const handleStarClick = (num) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub('');

    setStar(num);
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className='pr-4 pl-4 pb-2'>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // Load products on subcategory search
  const handleSubClick = (sub) => {
    // reset
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    setPrice([0, 0]);
    setStar('');
    setCategoryIds([]);
    setSub(sub);
    fetchProducts({ sub });
  };

  const showSubs = () =>
    subcategories.map((s) => (
      <div
        onClick={() => handleSubClick(s)}
        key={s._id}
        className='p-1 m-1 badge badge-secondary'
        style={{ cursor: 'pointer' }}>
        {s.name}
      </div>
    ));

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <Menu defaultOpenKeys={['1', '2']} mode='inline'>
            {/* Price */}
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

            {/* Category */}
            <Menu.SubMenu
              key='2'
              title={
                <span>
                  <DownSquareOutlined /> Categories
                </span>
              }>
              <div>{showCategories()}</div>
            </Menu.SubMenu>

            {/* Stars */}
            <Menu.SubMenu
              key='3'
              title={
                <span className='h6'>
                  <StarOutlined /> Rating
                </span>
              }>
              <div style={{ maringTop: '-10px' }}>{showStars()}</div>
            </Menu.SubMenu>

            {/* SubCategory */}
            <Menu.SubMenu
              key='4'
              title={
                <span>
                  <DownSquareOutlined /> Subcategories
                </span>
              }>
              <div className='ml-4'>{showSubs()}</div>
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
                <div className='text-center my-5'>No products found</div>
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
