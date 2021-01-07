import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Divider, List } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/navbar/AdminNav';
import Loading from '../../../components/loading/Loading';
import {
  createCategory,
  getCategories,
  deleteCategory
} from '../../../functions/category';

import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory({ name }, user.token)
      .then(() => {
        setLoading(false);
        setName('');
        toast.success(`Category of ${name} created!`);
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        setName('');
        if (err.response.status === 400) {
          toast.error(err.response.data);
        } else {
          toast.error(`Fail to create ${name} category!`);
        }
      });
  };

  const handleDelete = async (slug) => {
    if (window?.confirm('Delete?')) {
      setLoading(true);
      await deleteCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`Category of ${res.data.name} deleted successfully!`);
          loadCategories();
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) {
            toast.error(err.response.data);
          } else {
            toast.error(`Fail to delete the category!`);
          }
        });
    }
  };

  const filteredCategories = categories?.filter((c) =>
    c.name.includes(keyword)
  );

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
              <h4>Create Category</h4>
              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />

              <LocalSearch keyword={keyword} setKeyword={setKeyword} />

              <Divider>List of Categories</Divider>
              <List
                bordered
                dataSource={keyword ? filteredCategories : categories}
                renderItem={(c) => (
                  <List.Item key={c._id}>
                    {c.name}{' '}
                    <div className='float-right'>
                      <span onClick={() => handleDelete(c.slug)}>
                        <DeleteOutlined className='btn btn-sm text-danger' />
                      </span>
                      <Link to={`/admin/category/${c.slug}`}>
                        <EditOutlined className='btn btn-sm' />
                      </Link>
                    </div>
                  </List.Item>
                )}></List>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
