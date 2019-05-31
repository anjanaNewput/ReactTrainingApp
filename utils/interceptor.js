import axios from 'axios';
import { getToken } from './data-storage';
import { isLoading } from '../actions/user-action';
import { store } from '../utils/store';

axios.interceptors.request.use(function (config) {
  store.dispatch(isLoading(true))
  let token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  config.headers['content-type'] = 'application/json';
  config.baseURL = 'https://newput-training-app-be.herokuapp.com/api/v1/';
  return config;
  },
  function (error) {
    store.dispatch(isLoading(false))
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    store.dispatch(isLoading(false))
    return response;
  },
  function (error) {
    store.dispatch(isLoading(false))
    return Promise.reject(error);
  }
);
