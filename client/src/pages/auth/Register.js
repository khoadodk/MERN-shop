import React from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';

const Register = () => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // redirect
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `An email was sent to ${email}. Click the link in your email to complete your registration.`
    );
    window.localStorage.setItem('emailForSignIn', email);
    setEmail('');
  };

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <Button type='submit' className='btn btn-raised mt-3 float-right'>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
