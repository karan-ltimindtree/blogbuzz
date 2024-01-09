import { notifications } from '@mantine/notifications';
import { getUserDetails, loginUser, logoutUser, refreshUser, registerUser } from './auth.feature';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';

export function authExtraReducers(builder: ActionReducerMapBuilder<AuthState>) {
  return (
    builder
      // register states
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'idle';
        if (!action.payload.success) {
          notifications.show({
            title: 'Registration Failed',
            message: 'Email already exists',
            autoClose: true,
            color: 'red',
          });
        } else {
          notifications.show({
            title: 'Registration Successful',
            message: 'You can now login!',
            autoClose: true,
            color: 'green',
          });
        }
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed';
      })

      // login states
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('action.payload - ', action.payload);
        if (!action.payload.success) {
          notifications.show({
            title: 'Logout Failed',
            message: 'Invalid Credentials',
            autoClose: true,
            color: 'red',
          });
        } else {
          notifications.show({
            title: 'Logout Successful',
            message: 'Enjoy the blogging experience!',
            autoClose: true,
            color: 'green',
          });
          state.user = {
            id: action.payload.data.id,
            name: action.payload.data.name,
            email: action.payload.data.email,
          };
          state.loggedIn = true;
          state.accessToken = action.payload.accessToken;
          sessionStorage.setItem('accessToken', action.payload.accessToken);
          const name = action.payload.data.name.split(' ');
          if (name.length > 1) {
            state.initals = `${name[0][0]}${name[1][0]}`.toUpperCase();
          } else {
            state.initals = `${name[0][0]}${name[0][1]}`.toUpperCase();
          }
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error.code === 'ERR_BAD_REQUEST') {
          notifications.show({
            title: 'Logout Failed',
            message: 'Invalid Credentials',
            autoClose: true,
            color: 'red',
          });
        } else {
          notifications.show({
            title: 'Logout Failed',
            message: 'Server Error',
            autoClose: true,
            color: 'red',
          });
        }
      })

      .addCase(refreshUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.accessToken = sessionStorage.getItem('accessToken') || '';
        state.loggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(getUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        const name = action.payload.name.split(' ');
        if (name.length > 1) {
          state.initals = `${name[0][0]}${name[1][0]}`.toUpperCase();
        } else {
          state.initals = `${name[0][0]}${name[0][1]}`.toUpperCase();
        }
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.accessToken = '';
        state.loggedIn = false;
        state.user = null;
        sessionStorage.clear();
        notifications.show({
          title: 'Logout Successful',
          message: 'See you soon!',
          autoClose: true,
          color: 'green',
        });
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = 'failed';
      })
  );
}
