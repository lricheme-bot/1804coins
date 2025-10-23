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

      {/* Heroines Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Heroines of Haiti
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Celebrating the extraordinary women who fought fearlessly for Haiti's independence. 
              From Catherine Flon who sewed the first flag, to Sanite Belair and Marie-Jeanne Lamartinière 
              who led troops into battle, these heroines embody courage and sacrifice.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => ['Catherine Flon', 'Sanite Belair', 'Marie-Jeanne Lamartinière'].some(name => p.name.includes(name))).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/shop?filter=heroines">
              <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                View All Heroines
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gift Sets Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Exclusive Gift Sets
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              Perfect for collectors and history enthusiasts. Our curated gift sets celebrate Haiti's revolutionary 
              heroes in beautifully packaged collections. Each set comes with premium display cases and certificates 
              of authenticity.
            </p>
            <Link to="/custom-gift">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-8 py-6 text-lg">
                🎁 Build Your Own Custom Gift Set - Choose Any 3 Coins!
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => p.category === 'gift_set').slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/shop?filter=gift_set">
              <Button size="lg" variant="outline" className="border-2 border-black hover:bg-black hover:text-white">
                View All Gift Sets
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