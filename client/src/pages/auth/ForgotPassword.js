import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import Loading from '../../components/Loading/Loading';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push('/');
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // redirect
    const config = {
      url: process.env.REACT_APP_FORGOTPASSWORD_REDIRECT_URL,
      handleCodeInApp: true
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Please check your email for password reset link!');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log('ERRROR MSG IN FORGOT PASSWORD', error);
      });
  };

  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h4>Forgot password</h4>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <Button
              type='submit'
              className='btn btn-raised mt-3 float-right'
              disabled={!email}>
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
