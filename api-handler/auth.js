// api-handler/auth.js
import API from './axios';

export const loginUser = async (email, password) => {
  const response = await API.post('/login', { email, password });
  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await API.post('/register', {
    name: username,
    email,
    password_confirmation: password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post('/logout');
  return response.data;
};