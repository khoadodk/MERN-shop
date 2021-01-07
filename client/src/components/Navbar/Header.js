import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = React.useState('');
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent({ current: e.key });
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null
    });
    history.push('/login');
  };

  return (
    <div className='mb-2'>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
        <Menu.Item key='home' icon={<HomeOutlined />}>
          <Link to='/'>Home</Link>
        </Menu.Item>

        {user && (
          <SubMenu
            icon={<SettingOutlined />}
            title={user.email?.split('@')[0]}
            className='float-right'>
            {user && user.role === 'subscriber' && (
              <Menu.Item icon={<DashboardOutlined />}>
                <Link to='/user/history'>Dashboard</Link>
              </Menu.Item>
            )}

            {user && user.role === 'admin' && (
              <Menu.Item icon={<DashboardOutlined />}>
                <Link to='/admin/dashboard'>Dashboard</Link>
              </Menu.Item>
            )}

            <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
              Log Out
            </Menu.Item>
          </SubMenu>
        )}
        {!user && (
          <>
            <Item key='login' icon={<UserOutlined />} className='float-right'>
              <Link to='/login'>Login</Link>
            </Item>
            <Item
              key='register'
              icon={<UserAddOutlined />}
              className='float-right'>
              <Link to='/register'>Register</Link>
            </Item>
          </>
        )}
      </Menu>
    </div>
  );
};

export default Header;
