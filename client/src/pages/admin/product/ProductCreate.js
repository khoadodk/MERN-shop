import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Select } from 'antd';

import AdminNav from '../../../components/navbar/AdminNav';
import Loading from '../../../components/loading/Loading';

import { createProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  categories: [],
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  color: '',
  brand: '',
  colors: [
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
    'Orange',
    'Red',
    'Grey',
    'Yellow'
  ],
  brands: [
    'Apple',
    'Samsung',
    'Microsoft',
    'Google',
    'Amazon',
    'ASUS',
    'Lenovo'
  ]
};

const ProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [subCat, setSubCat] = useState([]);
  const [showSubCat, setShowSubCat] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const { user } = useSelector((state) => ({ ...state }));

  const {
    title,
    description,
    price,
    quantity,
    subs,
    colors,
    brands,
    categories
  } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    createProduct(values, user.token)
      .then(() => {
        setLoading(false);
        toast.success(`${title} created!`);
        setValues({ ...initialState, images: [] });
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          console.log(err.response);
          toast.error(err.response.data);
        } else {
          toast.error(`Fail to create ${title}!`);
        }
      });
  };

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = async (e) => {
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubCat(res.data);
    });
    setShowSubCat(true);
  };

  console.log(values.images);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNav />
        </div>
        <div className='col-md-6'>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <h4>Create Product</h4>

              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Title'
                  name='title'
                  value={title}
                  onChange={handleChange}
                  autoFocus
                />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Description'
                  name='description'
                  value={description}
                  onChange={handleChange}
                  autoFocus
                />
                <input
                  type='number'
                  className='form-control'
                  placeholder='Price'
                  name='price'
                  value={price}
                  onChange={handleChange}
                />
                <input
                  type='number'
                  className='form-control'
                  placeholder='Quanity'
                  name='quantity'
                  value={quantity}
                  onChange={handleChange}
                />
                <select
                  name='shipping'
                  className='form-control'
                  onChange={handleChange}>
                  <option value=''>Select Shipping</option>
                  <option value='no'>No Free Shipping</option>
                  <option value='yes'>Free Shipping</option>
                </select>
                <select
                  name='color'
                  className='form-control'
                  onChange={handleChange}>
                  <option value=''>Select Color</option>
                  {colors &&
                    colors.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
                <select
                  name='brand'
                  className='form-control'
                  onChange={handleChange}>
                  <option value=''>Select Brand</option>
                  {brands &&
                    brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                </select>
                <select
                  name='category'
                  className='form-control'
                  onChange={handleCategoryChange}>
                  <option value=''>Select Category</option>
                  {categories &&
                    categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>

                {showSubCat && subCat && (
                  <Select
                    mode='multiple'
                    style={{ width: '100%' }}
                    placeholder='Select Subcategory'
                    value={subs}
                    name='subs'
                    onChange={(value) => setValues({ ...values, subs: value })}>
                    {subCat.length &&
                      subCat.map((s) => (
                        <Select.Option key={s._id} value={s._id}>
                          {s.name}
                        </Select.Option>
                      ))}
                  </Select>
                )}

                <FileUpload values={values} setValues={setValues} />

                <button
                  type='submit'
                  className='btn btn-raised mt-3 float-right'>
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
