import React from 'react';
import { motion } from 'framer-motion';
import { timelineEvents } from '../mockData';
import { Calendar } from 'lucide-react';

const Timeline = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden" id="timeline">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-md border border-orange-200">
            <Calendar className="h-5 w-5" />
            <span className="uppercase tracking-wider">Historic Timeline</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Journey Through History
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Key moments that shaped Haiti's revolutionary legacy and the birth of the first Black republic
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-300 via-amber-500 to-orange-500"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 md:text-right" style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-amber-100">
                    <h3 className="text-2xl font-bold text-amber-600 mb-2">
                      {event.year}
                    </h3>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h4>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    {index + 1}
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
