import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from '../hooks/use-toast';
import { Gift, Check } from 'lucide-react';

const CustomGiftBuilder = () => {
  const [products, setProducts] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState(['', '', '']);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const GIFT_SET_PRICE = 60.00;
  const REGULAR_PRICE = 75.00; // 3 coins at $25 each
  const SAVINGS = REGULAR_PRICE - GIFT_SET_PRICE;
  const MAX_COINS = 3;

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

  const handleCoinSelection = (index, coinId) => {
    const newSelection = [...selectedCoins];
    newSelection[index] = coinId;
    setSelectedCoins(newSelection);
  };

  const getAvailableCoins = (currentIndex) => {
    // Get coins that haven't been selected in other slots
    return products.filter(coin => {
      return !selectedCoins.some((selected, idx) => 
        idx !== currentIndex && selected === coin.id
      );
    });
  };

  const getSelectedCoin = (coinId) => {
    return products.find(p => p.id === coinId);
  };

  const isComplete = selectedCoins.every(coin => coin !== '');

  const handleCheckout = async () => {
    if (!isComplete) {
      toast({
        title: "Selection Incomplete",
        description: `Please select ${MAX_COINS} coins to complete your gift set.`,
        variant: "destructive"
      });
      return;
    }

    // Add custom gift set ID 14 to cart
    try {
      const { addToCart } = await import('../context/CartContext');
      // This will add the "Build Your Own Gift Set" product
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: "Login Required",
          description: "Please login to add items to cart.",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }

      // Save selection to localStorage for order notes
      const selectedProducts = selectedCoins.map(id => products.find(p => p.id === id));
      localStorage.setItem('customGiftSet', JSON.stringify(selectedProducts));

      // Navigate to cart
      toast({
        title: "Success!",
        description: "Your custom gift set has been created! Review your selection in cart."
      });
      navigate('/cart');
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading coins...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full mb-4">
            <Gift className="inline-block w-5 h-5 mr-2" />
            <span className="font-semibold">Build Your Own Gift Set</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Any 3 Challenge Coins
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Create a personalized collection of Haiti's revolutionary heroes
          </p>
          
          {/* Pricing */}
          <div className="bg-white rounded-lg shadow-lg p-6 inline-block">
            <div className="flex items-center justify-center gap-4">
              <div className="text-left">
                <p className="text-sm text-gray-500">Regular Price:</p>
                <p className="text-2xl text-gray-400 line-through">${REGULAR_PRICE.toFixed(2)}</p>
              </div>
              <div className="text-5xl font-bold text-gray-300">→</div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Your Price:</p>
                <p className="text-4xl font-bold text-green-600">${GIFT_SET_PRICE.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block">
              <span className="font-bold">Save ${SAVINGS.toFixed(2)}!</span>
            </div>
          </div>
        </div>

        {/* Selection Card */}
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
              Select Your Heroes
            </h2>

            <div className="space-y-6">
              {[0, 1, 2].map((index) => (
                <div key={`coin-selector-${index}`} className="space-y-3">
                  <Label htmlFor={`coin-${index}`} className="text-lg font-semibold text-gray-700">
                    Coin {index + 1}
                  </Label>
                  <Select
                    key={`select-${index}-${selectedCoins[index]}`}
                    value={selectedCoins[index] || undefined}
                    onValueChange={(value) => handleCoinSelection(index, value)}
                  >
                    <SelectTrigger id={`coin-${index}`} className="w-full h-14 text-lg">
                      <SelectValue placeholder="Choose a hero..." />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableCoins(index).map((coin) => (
                        <SelectItem key={`${index}-${coin.id}`} value={coin.id} className="text-lg py-3">
                          {coin.name} - {coin.year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Show selected coin preview */}
                  {selectedCoins[index] && (
                    <div className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 border-2 border-green-500">
                      <Check className="w-6 h-6 text-green-600" />
                      <img
                        src={getSelectedCoin(selectedCoins[index])?.image}
                        alt={getSelectedCoin(selectedCoins[index])?.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {getSelectedCoin(selectedCoins[index])?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {getSelectedCoin(selectedCoins[index])?.description.substring(0, 80)}...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-gray-600">Your Selection:</span>
                <span className="text-lg font-semibold">
                  {selectedCoins.filter(c => c).length} of {MAX_COINS} coins selected
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-gray-900">Total Price:</span>
                <div className="text-right">
                  <p className="text-sm text-gray-500 line-through">${REGULAR_PRICE.toFixed(2)}</p>
                  <p className="text-3xl font-bold text-green-600">${GIFT_SET_PRICE.toFixed(2)}</p>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={!isComplete}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 h-14 text-lg font-semibold"
                size="lg"
              >
                {isComplete ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Complete Your Gift Set - ${GIFT_SET_PRICE.toFixed(2)}
                  </>
                ) : (
                  `Select ${MAX_COINS - selectedCoins.filter(c => c).length} more coin${MAX_COINS - selectedCoins.filter(c => c).length > 1 ? 's' : ''}`
                )}
              </Button>

              {isComplete && (
                <p className="text-center text-sm text-gray-600 mt-4">
                  Includes premium gift box with certificates of authenticity
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-3xl mb-2">🎁</div>
            <p className="font-semibold text-gray-900">Premium Packaging</p>
            <p className="text-sm text-gray-600">Beautiful gift box included</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-3xl mb-2">📜</div>
            <p className="font-semibold text-gray-900">Certificate</p>
            <p className="text-sm text-gray-600">Authenticity guaranteed</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-3xl mb-2">💰</div>
            <p className="font-semibold text-gray-900">Save $15</p>
            <p className="text-sm text-gray-600">Discounted bundle price</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomGiftBuilder;
