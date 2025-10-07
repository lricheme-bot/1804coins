import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Generate or get session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalItems: 0, subtotal: 0 });
  const [loading, setLoading] = useState(false);
  const sessionId = getSessionId();

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API}/cart/${sessionId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      await axios.post(`${API}/cart/add`, {
        sessionId,
        productId,
        quantity
      });
      await fetchCart();
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: error.response?.data?.detail || 'Failed to add to cart' };
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    setLoading(true);
    try {
      await axios.put(`${API}/cart/update`, {
        sessionId,
        productId,
        quantity
      });
      await fetchCart();
      return { success: true };
    } catch (error) {
      console.error('Error updating cart:', error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      await axios.delete(`${API}/cart/remove/${sessionId}/${productId}`);
      await fetchCart();
      return { success: true };
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API}/cart/clear/${sessionId}`);
      setCart({ items: [], totalItems: 0, subtotal: 0 });
      return { success: true };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
