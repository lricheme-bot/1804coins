import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Preserving Haiti's Past in Metal and Memory
              </h1>
              <p className="text-2xl text-red-600 font-medium">
                From 1804 To Your Hands - The Legacy Lives On.
              </p>
              <p className="text-lg text-gray-600">
                Discover our exclusive collection of challenge coins honoring Haiti's revolutionary heroes and independence fighters.
              </p>
              <Link to="/shop">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg">
                  Shop All
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=600&fit=crop"
                alt="Museum gallery"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
                Shop all
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Honoring Revolutionary Heroes
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Each commemorative coin in our collection tells the story of Haiti's remarkable journey to independence. 
            From the courage of Jean-Jacques Dessalines to the contributions of Catherine Flon, these pieces preserve 
            the legacy of those who shaped history.
          </p>
          <Link to="/about">
            <Button variant="link" className="text-lg text-gray-900 hover:text-gray-600">
              Learn More About Our Mission →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;