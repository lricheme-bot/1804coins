import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20 bg-gray-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative order-2 md:order-1"
        >
          <div className="relative w-full max-w-md mx-auto md:max-w-none">
            <img
              src="https://images.squarespace-cdn.com/content/v1/67d6ef5142cdf803b50d47be/5b2777b5-67d8-4e5b-b2ad-73d8011ad3fb/Galer%C3%ADa+de+Monedas+Hist%C3%B3ricas.png"
              alt="Historic Coins Gallery"
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left space-y-4 md:space-y-6 order-1 md:order-2"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Preserving Haiti's Past in Metal and Memory.
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-red-600">
            From 1804 To Your Hands - The Legacy lives On.
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
