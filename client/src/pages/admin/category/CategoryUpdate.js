import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/navbar/AdminNav';
import Loading from '../../../components/loading/Loading';
import { updateCategory } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setName(match.params.slug);
  }, [match.params.slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateCategory(match.params.slug, { name }, user.token)
      .then(() => {
        setLoading(false);
        toast.success(`Category of ${name} updated!`);
        history.push('/admin/category');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        } else {
          toast.error(`Fail to update ${name} category!`);
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

export default CategoryUpdate;
