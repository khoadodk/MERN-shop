import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

import UserNav from '../../components/navbar/UserNav';
import Loading from '../../components/loading/Loading';

const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword('');
        toast.success('Password updated successfully!');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='password'>Your New Password</label>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className='form-control'
          placeholder='Password must be at least 6 character long'
          disabled={loading}
        />
      </div>
      <button
        type='submit'
        className='btn btn-raised float-right'
        disabled={loading || password.length < 6}>
        Submit
      </button>
    </form>
  );

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <UserNav />
        </div>
        <div className='col-md-6'>
          {loading ? <Loading /> : passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
