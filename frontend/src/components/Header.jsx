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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group transition-all duration-300">
            {/* Premium Commemorative Coin Logo */}
            <div className="relative flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              {/* Outer glow effect */}
              <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 opacity-30 blur-lg group-hover:opacity-40 transition-opacity"></div>
              
              {/* Coin outer rim with Haitian flag accent */}
              <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-amber-800 via-amber-600 to-amber-900 flex items-center justify-center shadow-2xl border-[3px] border-amber-950" 
                   style={{
                     boxShadow: '0 8px 32px rgba(120, 53, 15, 0.5), inset 0 2px 8px rgba(255, 215, 0, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.3)'
                   }}>
                
                {/* Decorative notches (coin edge detail) */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: 'repeating-conic-gradient(from 0deg, transparent 0deg 5deg, rgba(255, 255, 255, 0.15) 5deg 6deg)'
                }}></div>
                
                {/* Middle ring with Haitian colors */}
                <div className="relative w-[62px] h-[62px] rounded-full flex items-center justify-center"
                     style={{
                       background: 'linear-gradient(135deg, #C41E3A 0%, #C41E3A 50%, #00209F 50%, #00209F 100%)',
                       boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                     }}>
                  
                  {/* Inner golden face */}
                  <div className="w-[54px] h-[54px] rounded-full bg-gradient-to-br from-yellow-100 via-amber-200 to-yellow-300 flex items-center justify-center border-2 border-amber-900 relative overflow-hidden"
                       style={{
                         boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.25), inset 0 -2px 4px rgba(255, 255, 255, 0.6), 0 1px 3px rgba(0, 0, 0, 0.2)'
                       }}>
                    
                    {/* Radial lines (coin texture) */}
                    <div className="absolute inset-0 opacity-20" style={{
                      background: 'repeating-radial-gradient(circle at center, transparent 0px, transparent 2px, rgba(180, 83, 9, 0.3) 2px, transparent 3px)'
                    }}></div>
                    
                    {/* Year text */}
                    <div className="text-center relative z-10">
                      <div className="text-[22px] font-black text-amber-950 tracking-tighter leading-none" 
                           style={{
                             textShadow: '0 2px 4px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.2)',
                             fontFamily: 'Georgia, serif'
                           }}>
                        1804
                      </div>
                    </div>
                    
                    {/* Top and bottom stars */}
                    <div className="absolute top-[2px] text-amber-800 text-[10px] opacity-80">⭐</div>
                    <div className="absolute bottom-[2px] text-amber-800 text-[10px] opacity-80">⭐</div>
                    
                    {/* Side decorative elements */}
                    <div className="absolute left-[4px] top-1/2 -translate-y-1/2 text-amber-700 text-[8px]">◆</div>
                    <div className="absolute right-[4px] top-1/2 -translate-y-1/2 text-amber-700 text-[8px]">◆</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Premium Brand Typography */}
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline space-x-1 mb-1">
                <span className="text-[28px] font-black text-gray-900 tracking-tight" style={{fontFamily: 'Georgia, serif'}}>
                  1804
                </span>
                <span className="text-[28px] font-bold text-gray-800 tracking-tight">
                  COINS
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600 font-semibold tracking-[0.15em] uppercase">
                  Haiti's Legacy
                </span>
                <span className="text-xs">🇭🇹</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.path.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    if (window.location.pathname !== '/') {
                      e.preventDefault();
                      navigate('/');
                      setTimeout(() => {
                        document.querySelector(link.path)?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                  className="text-gray-900 hover:text-orange-600 font-medium text-base transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-900 hover:text-orange-600 font-medium text-base transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Link to="/login" className="hidden md:block text-gray-900 hover:text-orange-600 font-medium transition-colors">
              Login
            </Link>
            
            <Button 
              onClick={() => navigate('/cart')}
              className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cartCount})
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-sm shadow-xl border-b-2 border-gray-200 py-6 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-900 hover:text-orange-600 font-semibold text-lg transition-colors py-2 px-4 rounded-lg hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-2">
                <Link
                  to="/login"
                  className="block text-gray-900 hover:text-orange-600 font-semibold text-lg transition-colors py-2 px-4 rounded-lg hover:bg-orange-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
