import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className='container-fluid'>
      <div className='text-center'>
        <Spin />
      </div>
    </div>
  );
};

export default Loading;
