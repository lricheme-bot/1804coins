import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left space-y-6"
        >
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
            <Shield className="h-4 w-4" />
            <span>Honoring Haitian Heritage Since 1804</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Preserving Haiti's Past in
            <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Metal & Memory
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-lg">
            From 1804 To Your Hands - The Legacy Lives On. Discover exquisite commemorative coins celebrating the heroes of Haiti's revolutionary history.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/shop">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-6 text-lg group"
              >
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="#about">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-6 text-lg"
              >
                Learn Our Story
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-8 pt-8">
            <div>
              <div className="text-3xl font-bold text-gray-900">1804</div>
              <div className="text-sm text-gray-600">Year of Independence</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <div className="text-3xl font-bold text-gray-900">6+</div>
              <div className="text-sm text-gray-600">Historic Figures</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <div className="text-3xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Authentic</div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <img
              src="https://images.squarespace-cdn.com/content/v1/67d6ef5142cdf803b50d47be/5b2777b5-67d8-4e5b-b2ad-73d8011ad3fb/Galer%C3%ADa+de+Monedas+Hist%C3%B3ricas.png"
              alt="Historic Coins Gallery"
              className="relative w-full h-full object-contain drop-shadow-2xl animate-float"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
