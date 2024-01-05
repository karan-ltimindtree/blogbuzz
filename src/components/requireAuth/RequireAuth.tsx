import { refreshUser } from '@/redux/features/auth/auth.feature';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux.hooks';
import { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const authState = useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!authState.accessToken && sessionStorage.getItem('accessToken')) {
      dispatch(refreshUser());
    }
  }, []);

  return authState.loggedIn || (authState.accessToken && authState.accessToken.length > 0) ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;
