import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/admin/dashboard'>Dashboard</Link>
        </li>

        <li className='nav-item'>
          <Link to='/admin/category'>Category</Link>
        </li>

        <li className='nav-item'>
          <Link to='/admin/subcategory'>Subcategory</Link>
        </li>

        <li className='nav-item'>
          <Link to='/admin/product'>Product</Link>
        </li>

        <li className='nav-item'>
          <Link to='/admin/products'>Products</Link>
        </li>

        <li className='nav-item'>
          <Link to='/admin/coupon'>Coupon</Link>
        </li>

        <li className='nav-item'>
          <Link to='/user/password'>User's Password</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
