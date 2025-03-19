import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || "Error desconocido";
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  }
);