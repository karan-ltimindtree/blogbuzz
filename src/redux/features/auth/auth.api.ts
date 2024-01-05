import { axiosAuthInstance, axiosPrivateInstance } from '../../../config/axios.config';

export function registerApi(name: string, email: string, password: string) {
  return axiosAuthInstance.post('/auth/register', { name, email, password });
}

export function loginApi(email: string, password: string) {
  return axiosAuthInstance.post('/auth/login', { email, password });
}

export function logoutApi() {
  return axiosAuthInstance.get('/auth/logout');
}

export function refreshTokenApi() {
  return axiosAuthInstance.get('/auth/refresh');
}

export function getUserDetailsApi() {
  return axiosPrivateInstance.get('/auth/getUserDetails');
}
