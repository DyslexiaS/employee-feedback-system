import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  register: async (userData: any) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },
};

export const reviews = {
  getAll: async () => {
    const { data } = await api.get('/reviews');
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get(`/reviews/${id}`);
    return data;
  },
  create: async (reviewData: any) => {
    const { data } = await api.post('/reviews', reviewData);
    return data;
  },
  update: async (id: string, reviewData: any) => {
    const { data } = await api.put(`/reviews/${id}`, reviewData);
    return data;
  },
};

export const employees = {
  getAll: async () => {
    const { data } = await api.get('/employees');
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get(`/employees/${id}`);
    return data;
  },
  create: async (employeeData: any) => {
    const { data } = await api.post('/employees', employeeData);
    return data;
  },
  update: async (id: string, employeeData: any) => {
    const { data } = await api.put(`/employees/${id}`, employeeData);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/employees/${id}`);
    return data;
  },
};