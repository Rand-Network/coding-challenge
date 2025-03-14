import axios from 'axios';
import ENV from '../config/env';

export const axiosInstance = axios.create({
  baseURL: ENV.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    }
    throw error;
  }
); 