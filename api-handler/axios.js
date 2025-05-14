// api-handler/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add token to every request if available
// API.interceptors.request.use((config) => {
//   const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default API;