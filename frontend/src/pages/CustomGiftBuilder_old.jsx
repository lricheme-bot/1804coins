import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from '../hooks/use-toast';
import { Check, X } from 'lucide-react';

const CustomGiftBuilder = () => {
  const [products, setProducts] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const GIFT_SET_PRICE = 60.00;
  const MAX_COINS = 3;
  const REGULAR_PRICE = 75.00; // 3 coins at $25 each
  const SAVINGS = REGULAR_PRICE - GIFT_SET_PRICE;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll();
        // Filter only individual coins (not gift sets, accessories, etc)
        const coins = data.filter(p => 
          ['historical', 'presidential', 'royal'].includes(p.category)
        );
        setProducts(coins);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleCoin = (coin) => {
    if (selectedCoins.find(c => c.id === coin.id)) {
      setSelectedCoins(selectedCoins.filter(c => c.id !== coin.id));
    } else {
      if (selectedCoins.length >= MAX_COINS) {
        toast({
          title: "Maximum Selection Reached",
          description: `You can only select ${MAX_COINS} coins for your gift set.`,
          variant: "destructive"
        });
        return;
      }
      setSelectedCoins([...selectedCoins, coin]);
    }
  };

  const handleCheckout = () => {
    if (selectedCoins.length < MAX_COINS) {
      toast({
        title: "Selection Incomplete",
        description: `Please select ${MAX_COINS} coins to complete your gift set.`,
        variant: "destructive"
      });
      return;
    }

    // Store selection in localStorage for checkout
    localStorage.setItem('customGiftSet', JSON.stringify(selectedCoins));
    toast({
      title: "Success",
      description: "Your custom gift set is ready! Proceeding to checkout..."
    });
    
    // In a real app, this would go to checkout
    setTimeout(() => {
      navigate('/shop');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading coins...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build Your Own Heroes Gift Set
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Select any {MAX_COINS} challenge coins to create your personalized collection
          </p>
          <p className="text-2xl font-bold text-gray-900">
            Gift Set Price: ${GIFT_SET_PRICE.toFixed(2)}
          </p>
        </div>

        {/* Selection Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Your Selection ({selectedCoins.length}/{MAX_COINS})
            </h3>
            {selectedCoins.length === MAX_COINS && (
              <Badge className="bg-green-600">Complete!</Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[...Array(MAX_COINS)].map((_, index) => (
              <div
                key={index}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 flex items-center justify-center"
              >
                {selectedCoins[index] ? (
                  <div className="text-center">
                    <img
                      src={selectedCoins[index].image}
                      alt={selectedCoins[index].name}
                      className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
                    />
                    <p className="text-xs font-medium text-gray-700">
                      {selectedCoins[index].name}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Slot {index + 1}</p>
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={handleCheckout}
            disabled={selectedCoins.length < MAX_COINS}
            className="w-full bg-black text-white hover:bg-gray-800"
            size="lg"
          >
            {selectedCoins.length < MAX_COINS
              ? `Select ${MAX_COINS - selectedCoins.length} more coin${MAX_COINS - selectedCoins.length > 1 ? 's' : ''}`
              : 'Complete Your Gift Set'}
          </Button>
        </div>

        {/* Available Coins */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Heroes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((coin) => {
              const isSelected = selectedCoins.find(c => c.id === coin.id);
              return (
                <Card
                  key={coin.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    isSelected ? 'ring-4 ring-green-500' : ''
                  }`}
                  onClick={() => toggleCoin(coin)}
                >
                  <div className="relative">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-green-500 rounded-full p-2">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{coin.name}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {coin.description}
                    </p>
                    <div className="mt-3">
                      <Button
                        variant={isSelected ? 'default' : 'outline'}
                        size="sm"
                        className={`w-full ${
                          isSelected ? 'bg-green-600 hover:bg-green-700' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCoin(coin);
                        }}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Selected
                          </>
                        ) : (
                          'Select This Coin'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomGiftBuilder;
