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
                  <div className="bg-white overflow-hidden transition-all duration-300">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                      />
                      
                      {/* Status Badge */}
                      <Badge className={`absolute top-4 right-4 ${statusInfo.className}`}>
                        {statusInfo.text}
                      </Badge>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 underline decoration-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{product.subtitle}</p>
                      <p className="text-base text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
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
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8"
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
