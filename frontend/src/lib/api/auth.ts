import axios from 'axios';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  },

  register: async (userData: { email: string; password: string }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
};