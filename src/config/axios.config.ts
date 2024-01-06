import axios from 'axios';

export const axiosAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_BE,
  withCredentials: true,
});

const axiosPrivateInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_BE,
  withCredentials: true,
});

axios.defaults.withCredentials = true;
axiosAuthInstance.defaults.withCredentials = true;
axiosPrivateInstance.defaults.withCredentials = true;

axiosPrivateInstance.interceptors.request.use(
  (config) => {
    config.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
    config.headers['Access-Control-Allow-Credentials'] = true;
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Headers'] =
      'Origin, X-Requested-With, Content-Type, Accept';
    config.headers['Authorization'] = sessionStorage.getItem('accessToken');
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
axiosPrivateInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { response, config } = error;

    if (response.status !== 403) {
      return Promise.reject(error);
    }

    // Use a 'clean' instance of axios without the interceptor to refresh the token. No more infinite refresh loop.
    return axiosPrivateInstance
      .get('/auth/refresh')
      .then((res) => {
        // If you are using localStorage, update the token and Authorization header here
        sessionStorage.setItem('accessToken', res.data.accessToken);
        return axiosPrivateInstance(config);
      })
      .catch(() => {
        return Promise.reject(error);
      });
  }
);

export { axiosPrivateInstance };
