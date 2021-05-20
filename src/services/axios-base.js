import axios from 'axios';

import store from '@/store';
import { logout } from '@/store/actions/auth';
import { getHeaders } from '@/utils';

// Make an 'instance' of axios
const instance = axios.create({
  // .. where we make our configurations
  baseURL: process.env.REACT_APP_API_SERVER_URL || 'http://localhost:3000/v1',
});

instance.interceptors.request.use(
  request => {
    request.headers = getHeaders();
    return request;
  },
  error => {
    return Promise.reject(error.message);
  },
);

// Add configure interceptors && all the other cool stuff
instance.interceptors.response.use(
  response => {
    if (response.config.parse) {
      //perform the manipulation here and change the response object
    }
    return response;
  },
  error => {
    if (error?.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error.message);
  },
);

export default instance;
