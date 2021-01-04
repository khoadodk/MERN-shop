import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';

const AdminRoute = ({ ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then(() => setIsAdmin(true))
        .catch(() => setIsAdmin(false));
    }
  }, [user]);

  return isAdmin ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
