import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className="w-full bg-gray-700 text-white text-center py-2 text-sm">
        Now we have Sanite Belair Challenge coins in stock
      </div>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-xs border-4 border-yellow-500">
                <div className="text-center">
                  <div className="text-[10px]">1804</div>
                  <div className="text-[8px]">COINS</div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-800 hover:text-gray-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/shop" className="text-gray-800 hover:text-gray-600 font-medium transition-colors">
                Shop
              </Link>
              <Link to="/about" className="text-gray-800 hover:text-gray-600 font-medium transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-800 hover:text-gray-600 font-medium transition-colors">
                Contact
              </Link>
              <Link to="/faqs" className="text-gray-800 hover:text-gray-600 font-medium transition-colors">
                FAQs
              </Link>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {['admin@1804coins.com', 'owner@1804coins.com'].includes(user.email) && (
                    <Link to="/admin">
                      <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{user.username}</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center space-x-2">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
              )}
              <Link to="/cart">
                <Button variant="default" size="sm" className="bg-black text-white hover:bg-gray-800">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({cart.length})
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link to="/" className="block text-gray-800 hover:text-gray-600 font-medium">
                Home
              </Link>
              <Link to="/shop" className="block text-gray-800 hover:text-gray-600 font-medium">
                Shop
              </Link>
              <Link to="/about" className="block text-gray-800 hover:text-gray-600 font-medium">
                About
              </Link>
              <Link to="/contact" className="block text-gray-800 hover:text-gray-600 font-medium">
                Contact
              </Link>
              <Link to="/faqs" className="block text-gray-800 hover:text-gray-600 font-medium">
                FAQs
              </Link>
              <div className="pt-3 border-t border-gray-200">
                {user ? (
                  <>
                    <div className="text-gray-800 font-medium mb-2">Hello, {user.username}</div>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;