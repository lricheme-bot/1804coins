import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, ShoppingCart, Eye } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getProducts({ featured: true });
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const result = await addToCart(product.id);
    if (result.success) {
      toast({
        title: "Added to Cart!",
        description: `${product.name} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to add to cart",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'in-stock': { text: 'In Stock', className: 'bg-green-500 text-white' },
      'limited': { text: 'Limited Stock', className: 'bg-orange-500 text-white' },
      'coming-soon': { text: 'Coming Soon', className: 'bg-blue-500 text-white' },
      'pre-order': { text: 'Pre-Order', className: 'bg-purple-500 text-white' }
    };
    return variants[status] || variants['coming-soon'];
  };

  return (
    <section className="py-20 bg-white" id="featured">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Featured Products
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => {
            const statusInfo = getStatusBadge(product.status);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 group-hover:border-orange-300 transform group-hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Status Badge */}
                      <Badge className={`absolute top-4 right-4 shadow-lg ${statusInfo.className} font-bold uppercase text-xs tracking-wide`}>
                        {statusInfo.text}
                      </Badge>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                        <span className="text-white font-semibold text-sm bg-orange-600 px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          View Details →
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 text-center bg-gradient-to-b from-white to-gray-50">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-1">{product.subtitle}</p>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">USD</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/shop">
            <Button 
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 rounded-md"
            >
              Shop All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
