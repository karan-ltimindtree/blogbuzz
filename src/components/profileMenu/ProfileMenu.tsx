import { useRefreshToken } from '@/hooks/useRefreshToken';
import { getUserDetails, logoutUser } from '@/redux/features/auth/auth.feature';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux.hooks';
import { Avatar, Menu } from '@mantine/core';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function ProfileMenu() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selector.loggedIn) {
      const accessToken = sessionStorage.getItem('accessToken');
      if (!accessToken) navigate('/auth', { replace: true });
    }
    if (!selector.user) {
      dispatch(getUserDetails());
    }
  }, []);

  return (
    <Menu trigger="click-hover">
      <Menu.Target>
        <Avatar color="blue" radius="xl">
          {selector.initals}
        </Avatar>
      </Menu.Target>
      <Menu.Dropdown>
        <Link to="/myPosts" style={{ textDecoration: 'none' }}>
          <Menu.Item>My Posts</Menu.Item>
        </Link>
        <Menu.Divider />
        <Menu.Item color="red" onClick={() => dispatch(logoutUser())}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
