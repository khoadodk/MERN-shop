import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, Button, Image } from 'antd';
import noImage from '../../images/no-image.png';

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));

  return (
    <Drawer
      className='text-center'
      placement='right'
      title={`${cart.length} items in Cart`}
      closable={true}
      onClose={() => {
        dispatch({
          type: 'SET_VISIBLE',
          payload: false
        });
      }}
      visible={drawer}>
      {cart.map((p) => (
        <div key={p._id} className='row'>
          <div className='col'>
            {p.images[0] ? (
              <Image src={p.images[0].url} width={100} />
            ) : (
              <Image src={noImage} width={100} />
            )}
            <p className='text-center text-light bg-secondary mt-2'>
              {p.title} x {p.count}
            </p>
          </div>
        </div>
      ))}
      <Link to='/cart'>
        <Button
          onClick={() => dispatch({ type: 'SET_VISIBLE', payload: false })}
          type='primary'>
          Go To Cart
        </Button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
