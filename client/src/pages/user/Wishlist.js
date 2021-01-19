import React from 'react';
import UserNav from '../../components/navbar/UserNav';

const Wishlist = () => {
  return (
    <div className='container-fluid pt-2'>
      <div className='row'>
        <div className='col-md-3'>
          <UserNav />
        </div>
        <div className='col-md-6'>user history page</div>
      </div>
    </div>
  );
};

export default Wishlist;
