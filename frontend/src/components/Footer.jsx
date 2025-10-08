import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 border-t-4 border-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">1804</span>
              </div>
              <div>
                <div className="text-xl font-bold text-white">1804 COINS</div>
                <div className="text-xs text-gray-400">Haiti's Legacy</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Preserving Haiti's revolutionary legacy through premium collectible coins. Honor the revolution, hold the legacy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-500">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                  <span className="mr-2 text-orange-600 group-hover:translate-x-1 transition-transform">→</span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                  <span className="mr-2 text-orange-600 group-hover:translate-x-1 transition-transform">→</span>
                  Shop
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                  <span className="mr-2 text-orange-600 group-hover:translate-x-1 transition-transform">→</span>
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                  <span className="mr-2 text-orange-600 group-hover:translate-x-1 transition-transform">→</span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-500">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop?category=revolutionary-leaders" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                  <span className="mr-2 text-orange-600 group-hover:translate-x-1 transition-transform">→</span>
                  Revolutionary Leaders
                </Link>
              </li>
              <li>
                <Link to="/shop?category=revolutionary-heroes" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                  <span className="mr-2 text-orange-600 group-hover:translate-x-1 transition-transform">→</span>
                  Revolutionary Heroes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=landmarks" className="text-gray-300 hover:text-orange-400 transition-colors flex items-center group">
                  <span className="mr-2 text-orange-600 group-hover:translate-x-1 transition-transform">→</span>
                  Historic Landmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-500">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/1804coins/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/1804coins"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                title="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 mt-6 text-sm leading-relaxed">
              Stay connected for new releases, special offers, and Haitian heritage stories.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 1804Coins. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
