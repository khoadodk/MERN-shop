import React, { useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (user && user.token) {
      history.push('/');
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token
        }
      });
      setLoading(false);
      history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        });
        setLoading(false);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <h4 className='text-center'>Welcome back to MERN shop</h4>
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
      <Button
        type='submit'
        className='btn btn-raised mt-4 float-right'
        disabled={!email || password.length < 6}
        icon={<MailOutlined />}>
        Log in with Email
      </Button>
      <Button
        type='submit'
        className='btn mt-4'
        onClick={googleLogin}
        icon={<GoogleOutlined />}>
        Log in with Google
      </Button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading && <h4 className='text-danger'>Loading...</h4>}
          {loginForm()}
          Don't remember your password? Reset{' '}
          <Link to='/forgot/password'>here</Link>.
        </div>
      </div>
    </div>
  );
};

export default Login;
