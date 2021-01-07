import React from 'react';
import UserNav from '../../components/navbar/UserNav';

const History = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <UserNav />
        </div>
        <div className='col-md-6'>user history page</div>
      </div>
    </div>
  );
};

export default History;
