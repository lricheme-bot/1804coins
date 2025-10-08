import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Award, Globe } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Shield,
      title: 'Authenticity',
      description: 'Every coin is crafted with historical accuracy and cultural pride'
    },
    {
      icon: Heart,
      title: 'Heritage',
      description: 'Honoring the legacy of Haiti\'s revolutionary heroes'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Premium collectibles made with exceptional craftsmanship'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Sharing Haitian history with collectors worldwide'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.squarespace-cdn.com/content/v1/67d6ef5142cdf803b50d47be/ff3511f4-80e2-4974-8925-ce621e63ab02/Sans-Souci+Palace+Antique+Coin.png"
                alt="Historic Coin"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              About Our Company
            </h2>
            
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                At <span className="font-bold text-amber-600">1804 Coins</span>, we believe that history deserves to be held, honored, and remembered — not just read about. Our mission is to preserve the legacy of Haiti's revolutionary heroes through premium collectible coins that embody the courage, sacrifice, and spirit of independence that defined 1804.
              </p>
              
              <p>
                Each coin we create is more than metal — it's a tribute to the brave men and women who fought for the world's first Black republic. From Jean-Jacques Dessalines to Sanité Bélair, our designs are crafted with historical accuracy, artistic depth, and cultural pride.
              </p>
              
              <p>
                Whether you're a collector, a historian, or someone proud of their Haitian roots, our coins offer a tangible connection to the past.
              </p>
              
              <p className="font-semibold text-gray-900">
                We're proudly Haitian-owned and passionately committed to sharing Haiti's rich revolutionary legacy with the world — one coin at a time.
              </p>
              
              <p className="text-xl font-bold text-amber-600 italic">
                "Honor the revolution. Hold the legacy."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-amber-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
