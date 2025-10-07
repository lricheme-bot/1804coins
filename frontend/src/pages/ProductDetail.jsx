import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProduct, getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ShoppingCart, ArrowLeft, Plus, Minus, Heart, Share2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const productData = await getProduct(id);
      setProduct(productData);
      
      // Fetch related products
      const allProducts = await getProducts({ category: productData.category });
      const related = allProducts.filter(p => p.id !== id).slice(0, 3);
      setRelatedProducts(related);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button className="bg-amber-600 hover:bg-amber-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const variants = {
      'in-stock': { text: 'In Stock', className: 'bg-green-500 text-white' },
      'limited': { text: 'Limited Stock', className: 'bg-orange-500 text-white' },
      'coming-soon': { text: 'Coming Soon', className: 'bg-blue-500 text-white' },
      'pre-order': { text: 'Pre-Order', className: 'bg-purple-500 text-white' }
    };
    return variants[status] || variants['coming-soon'];
  };

  const statusInfo = getStatusBadge(product.status);

  const handleAddToCart = async () => {
    const result = await addToCart(product.id, quantity);
    if (result.success) {
      toast({
        title: "Added to Cart!",
        description: `${quantity} x ${product.name} added to your cart.`,
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to add to cart",
        variant: "destructive"
      });
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, Math.min(10, quantity + delta)));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Loading...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/shop" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div 
                className={`relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden shadow-2xl cursor-zoom-in ${
                  isZoomed ? 'transform scale-110' : ''
                } transition-transform duration-300`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-4 right-4 ${statusInfo.className}`}>
                  {statusInfo.text}
                </Badge>
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">Click to zoom</p>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-600">{product.subtitle}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-amber-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-b border-gray-200 py-6 space-y-4">
                <div>
                  <span className="font-semibold text-gray-900">Status: </span>
                  <Badge className={statusInfo.className}>{statusInfo.text}</Badge>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Category: </span>
                  <span className="text-gray-600 capitalize">{product.category.replace('-', ' ')}</span>
                </div>
              </div>

              {/* Quantity Selector */}
              {product.inStock && (
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-900">Quantity:</span>
                  <div className="flex items-center border-2 border-amber-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="hover:bg-amber-50"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                      className="hover:bg-amber-50"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-6 text-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 py-6"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 py-6"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
                <h3 className="font-semibold text-gray-900 mb-2">Product Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Premium quality collectible</li>
                  <li>✓ Historically accurate design</li>
                  <li>✓ Comes with certificate of authenticity</li>
                  <li>✓ Perfect for collectors and history enthusiasts</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-20"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Historical Significance</h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => {
                  const relatedStatusInfo = getStatusBadge(relatedProduct.status);
                  return (
                    <Link
                      key={relatedProduct.id}
                      to={`/product/${relatedProduct.id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                          <img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <Badge className={`absolute top-4 right-4 ${relatedStatusInfo.className}`}>
                            {relatedStatusInfo.text}
                          </Badge>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">{relatedProduct.subtitle}</p>
                          <span className="text-2xl font-bold text-amber-600">
                            ${relatedProduct.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
