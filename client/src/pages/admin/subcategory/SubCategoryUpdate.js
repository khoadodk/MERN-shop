import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import AdminNav from '../../../components/navbar/AdminNav';
import Loading from '../../../components/loading/Loading';
import { getCategories } from '../../../functions/category';
import {
  getSubCategory,
  updateSubCategory
} from '../../../functions/subcategory';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubCategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState('');
  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSub();
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSubCategory(match.params._id).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateSubCategory(match.params._id, { name, parent }, user.token)
      .then(() => {
        setLoading(false);
        toast.success(`SubCategory of ${name} updated!`);
        history.push('/admin/subcategory');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        } else {
          toast.error(`Fail to update ${name} subcategory!`);
        }
      });
  };

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
              <h4>Update Category</h4>

              <Select
                labelInValue
                name='category'
                placeholder='Please select'
                onChange={(c) => setParent(c.value)}
                style={{ width: 150, marginTop: 10, marginBottom: 10 }}>
                {categories?.map((c) => (
                  <Select.Option
                    key={c._id}
                    value={c._id}
                    disabled={c._id === parent}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>

              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryUpdate;
