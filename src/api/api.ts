import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getToken = (): string | null => sessionStorage.getItem('token');

export const clearToken = (): void => sessionStorage.removeItem('token');

export const setAuthToken = (token: string | null): void => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    sessionStorage.setItem('token', token);
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
    clearToken();
  }
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      setAuthToken(null);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const signup = async (userData: {
  fullName: string;
  rut: string;
  email: string;
  phone: string;
  country: string;
  birthday: string;
  role: string;
  password: string;
}, token: string): Promise<any> => {
  try {
    const response = await apiClient.post('/user/signup', userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
