import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserDetailsApi, loginApi, logoutApi, refreshTokenApi, registerApi } from './auth.api';
import { notifications } from '@mantine/notifications';
import { AuthState } from './auth.types';
import { authExtraReducers } from './auth.reducer';

const initialState: AuthState = {
  loggedIn: false,
  accessToken: '',
  user: null,
  status: 'idle',
  initals: 'N/A',
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: { name: string; email: string; password: string }) => {
    const response = await registerApi(data.name, data.email, data.password);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }) => {
    const response = await loginApi(data.email, data.password);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  const response = await logoutApi();
  return response.data;
});

export const refreshUser = createAsyncThunk('/auth/refresh', async () => {
  const response = await refreshTokenApi();
  return response.data;
});

export const getUserDetails = createAsyncThunk('/auth/getUserDetails', async () => {
  const response = await getUserDetailsApi();
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: authExtraReducers,
});

export const { setAccessToken } = authSlice.actions;

// Example of sync & async logic in same custom thunk
/* export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  }; */

export default authSlice.reducer;
