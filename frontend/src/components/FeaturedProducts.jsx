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
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Status Badge */}
                    <Badge className={`absolute top-4 right-4 ${statusInfo.className}`}>
                      {statusInfo.text}
                    </Badge>

                    {/* Quick Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                      <Link to={`/product/${product.id}`}>
                        <Button 
                          size="sm" 
                          className="bg-white text-gray-900 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      {product.inStock && (
                        <Button 
                          size="sm" 
                          className="bg-amber-600 text-white hover:bg-amber-700"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{product.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-amber-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <Link to={`/product/${product.id}`}>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                          Details
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
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
