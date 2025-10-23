import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const cartAPI = {
  addToCart: async (productId, quantity = 1) => {
    const response = await api.post('/cart/add', { product_id: productId, quantity });
    return response.data;
  },
  
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },
  
  updateQuantity: async (productId, quantity) => {
    const response = await api.put('/cart/update', { product_id: productId, quantity });
    return response.data;
  },
  
  removeItem: async (productId) => {
    const response = await api.delete(`/cart/remove/${productId}`);
    return response.data;
  },
  
  clearCart: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  },
  
  checkout: async () => {
    const response = await api.post('/cart/checkout');
    return response.data;
  },
  
  getOrders: async () => {
    const response = await api.get('/cart/orders');
    return response.data;
  }
};

export default cartAPI;
