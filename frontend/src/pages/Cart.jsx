import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, loading } = useCart();
  const { toast } = useToast();

  const updateQuantity = async (productId, newQuantity) => {
    const result = await updateCartItem(productId, newQuantity);
    if (!result.success) {
      toast({
        title: "Error",
        description: "Failed to update cart",
        variant: "destructive"
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    const result = await removeFromCart(productId);
    if (result.success) {
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive"
      });
    }
  };

  const cartItems = cart.items || [];
  const subtotal = cart.subtotal || 0;
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/shop" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-4 group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">Shopping Cart</h1>
          </motion.div>

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full mb-6">
                <ShoppingBag className="h-12 w-12 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Start adding some commemorative coins to your collection!</p>
              <Link to="/shop">
                <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-6 text-lg">
                  Browse Collection
                </Button>
              </Link>
            </motion.div>
          ) : (
            /* Cart with Items */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg flex items-center space-x-6"
                  >
                    {/* Image */}
                    <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.subtitle}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border-2 border-amber-300 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1 || loading}
                            className="hover:bg-amber-50"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={loading}
                            className="hover:bg-amber-50"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.productId)}
                          disabled={loading}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg sticky top-32">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-semibold">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-amber-600">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-6 text-lg mb-4">
                    Proceed to Checkout
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    Secure checkout powered by Stripe
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
