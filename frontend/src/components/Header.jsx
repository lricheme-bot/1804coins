import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();
  
  const cartCount = cart.totalItems || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '#about' },
    { name: 'Contact', path: '#contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group hover:opacity-90 transition-opacity">
            {/* Premium Coin Badge Logo */}
            <div className="relative flex items-center justify-center">
              {/* Outer decorative ring */}
              <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 opacity-20 blur-sm"></div>
              
              {/* Main coin badge */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-amber-700 via-yellow-600 to-amber-800 flex items-center justify-center shadow-xl border-2 border-amber-900" style={{boxShadow: '0 4px 20px rgba(180, 83, 9, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)'}}>
                {/* Inner circle with embossed effect */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-200 flex items-center justify-center border-2 border-amber-800 relative" style={{boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'}}>
                  {/* Year with better typography */}
                  <div className="text-center relative z-10">
                    <div className="text-xl font-extrabold text-amber-900 tracking-tight leading-none" style={{textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'}}>
                      1804
                    </div>
                  </div>
                  {/* Subtle decorative stars */}
                  <div className="absolute top-1 text-amber-700 text-xs">★</div>
                  <div className="absolute bottom-1 text-amber-700 text-xs">★</div>
                </div>
              </div>
            </div>
            
            {/* Refined Brand Text */}
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-bold text-gray-900 tracking-tight mb-1">1804 COINS</span>
              <span className="text-sm text-gray-600 font-medium tracking-wide">Haiti's Legacy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-900 hover:text-gray-600 font-normal transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Link to="/login" className="hidden md:block text-gray-900 hover:text-gray-600 font-normal">
              Login
            </Link>
            
            <Button 
              onClick={() => navigate('/cart')}
              className="bg-black text-white hover:bg-gray-800 font-normal px-6"
            >
              Cart ({cartCount})
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 hover:text-amber-600 font-medium transition-colors px-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
