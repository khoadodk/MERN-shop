import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className='text-center p-5'>
      <Spin />
    </div>
  );
};

export default Loading;
