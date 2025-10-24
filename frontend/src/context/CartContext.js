import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/cartAPI';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0, item_count: 0 });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [], total: 0, item_count: 0 });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      console.log('[CartContext] Fetching cart...');
      const data = await cartAPI.getCart();
      console.log('[CartContext] Cart data received:', data);
      setCart(data);
    } catch (error) {
      console.error('[CartContext] Failed to fetch cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      await cartAPI.addToCart(productId, quantity);
      await fetchCart();
      return { success: true };
    } catch (error) {
      console.error('Failed to add to cart:', error);
      return { success: false, error: error.response?.data?.detail || 'Failed to add item' };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      await cartAPI.updateQuantity(productId, quantity);
      await fetchCart();
      return { success: true };
    } catch (error) {
      console.error('Failed to update quantity:', error);
      return { success: false, error: error.response?.data?.detail };
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      setLoading(true);
      await cartAPI.removeItem(productId);
      await fetchCart();
      return { success: true };
    } catch (error) {
      console.error('Failed to remove item:', error);
      return { success: false, error: error.response?.data?.detail };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartAPI.clearCart();
      await fetchCart();
      return { success: true };
    } catch (error) {
      console.error('Failed to clear cart:', error);
      return { success: false, error: error.response?.data?.detail };
    } finally {
      setLoading(false);
    }
  };

  const checkout = async () => {
    try {
      setLoading(true);
      const result = await cartAPI.checkout();
      await fetchCart(); // Clear cart after checkout
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to checkout:', error);
      return { success: false, error: error.response?.data?.detail || 'Checkout failed' };
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      checkout,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
