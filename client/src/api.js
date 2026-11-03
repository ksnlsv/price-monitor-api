import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Перехватчик: автоматически подцепляем JWT-токен, если он есть
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Функции для работы с товарами (соответствуют твоему productController.js)
export const fetchProducts = async (searchQuery = '') => {
  const params = searchQuery ? { search: searchQuery } : {};
  const response = await api.get('/products', { params });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};