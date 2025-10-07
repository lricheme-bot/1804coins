import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import Timeline from '../components/Timeline';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <Timeline />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
