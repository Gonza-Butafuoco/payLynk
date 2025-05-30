// frontend/src/lib/api/auth.ts
import axios from 'axios';

const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post('/api/auth/login', credentials);
  return response.data; // { token: string, user: User }
};

const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data; 
};


export const register = async (userData: { email: string; password: string }) => {
  const response = await axios.post('/api/auth/register', userData);
  return response.data;
};


export const authService = {
  login,
  getProfile,
  register
};





