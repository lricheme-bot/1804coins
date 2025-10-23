import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const ProductCard = ({ product }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_stock':
        return <Badge className="bg-green-100 text-green-800 border-green-300">In Stock</Badge>;
      case 'limited_stock':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-300">Limited Stock</Badge>;
      case 'coming_soon':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <div className="absolute top-3 right-3 z-10">
            {getStatusBadge(product.status)}
          </div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">Challenge Coin</p>
          {product.status === 'coming_soon' ? (
            <p className="text-sm text-gray-500">Coming soon</p>
          ) : (
            <p className="text-xl font-bold text-gray-900">${product.price}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;