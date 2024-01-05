import { useRefreshToken } from '@/hooks/useRefreshToken';
import { getUserDetails, logoutUser } from '@/redux/features/auth/auth.feature';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux.hooks';
import { Avatar, Menu } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function ProfileMenu() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  // const refresh = useRefreshToken();

  const [initials, setInitials] = useState('N/A');

  useEffect(() => {
    if (!selector.loggedIn) {
      const accessToken = sessionStorage.getItem('accessToken');
      if (!accessToken) navigate('/auth', { replace: true });
    }
    if (!selector.user) {
      dispatch(getUserDetails());
    }
  }, []);

  useEffect(() => {
    if (selector.user && initials === 'N/A') {
      const name = selector.user.name.split(' ');
      if (name.length > 1) {
        setInitials(`${name[0][0]}${name[1][0]}`.toUpperCase());
      } else {
        setInitials(`${name[0][0]}${name[0][1]}`.toUpperCase());
      }
    }
  }, [selector.user]);

  return (
    <Menu trigger="click-hover">
      <Menu.Target>
        <Avatar color="blue" radius="xl">
          {initials}
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
