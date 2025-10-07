import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Products
export const getProducts = async (params = {}) => {
  const response = await axios.get(`${API}/products`, { params });
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${API}/products/${id}`);
  return response.data;
};

// Contact
export const submitContact = async (data) => {
  const response = await axios.post(`${API}/contact`, data);
  return response.data;
};

// Orders
export const createOrder = async (orderData) => {
  const response = await axios.post(`${API}/orders`, orderData);
  return response.data;
};

export const getOrder = async (orderId) => {
  const response = await axios.get(`${API}/orders/${orderId}`);
  return response.data;
};
