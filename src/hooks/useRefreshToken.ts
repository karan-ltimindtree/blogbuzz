import { useAppDispatch } from '@/redux/hooks/redux.hooks';
import { axiosAuthInstance } from '../config/axios.config';
import { setAccessToken } from '../redux/features/auth/auth.feature';

export function useRefreshToken() {
  console.log('useRefreshToken');
  const dispatch = useAppDispatch();

  const refresh = async function () {
    const response = await axiosAuthInstance.get('/auth/refresh');
    dispatch(setAccessToken(response.data.accessToken));
  };

  return refresh;
}
