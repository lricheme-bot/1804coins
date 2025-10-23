import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">About 1804 Coins</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Preserving Haiti's revolutionary history through beautifully crafted commemorative coins.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Shipping & Returns</li>
              <li className="text-gray-400">Privacy Policy</li>
              <li className="text-gray-400">Terms & Conditions</li>
              <li className="text-gray-400">Track Your Order</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on new releases and special offers.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} 1804 Coins. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;