import React from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Register = ({ history }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignIn'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      toast.error('Email and password is required.');
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result) {
        //   Remove user email from local storage
        window.localStorage.removeItem('emailForSignIn');
        // Get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // Redux Store
        console.log(idTokenResult);
        // Redirect
        history.push('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
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
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type='submit' className='btn btn-raised mt-3 float-right'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
