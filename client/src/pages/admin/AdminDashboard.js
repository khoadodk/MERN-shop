import React from 'react';

import AdminNav from '../../components/navbar/AdminNav';

const AdminDashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminNav />
        </div>
        <div className='col-md-6'>
          <h4 className='text-center py-5'>Admin Dashboard</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
