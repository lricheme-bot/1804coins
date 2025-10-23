import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts, mockComments } from '../mockData';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Share2, Facebook, Twitter, MessageCircle, ShoppingCart, ThumbsUp, Calendar, Weight, Ruler, Package } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const product = mockProducts.find(p => p.id === id);
  const [comments, setComments] = useState(mockComments[id] || []);
  const [newComment, setNewComment] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddComment = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to post a comment.",
        variant: "destructive"
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty.",
        variant: "destructive"
      });
      return;
    }

    const comment = {
      id: `c${Date.now()}`,
      userId: user.id,
      username: user.username,
      comment: newComment,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
    toast({
      title: "Success",
      description: "Your comment has been posted."
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this amazing ${product.name} commemorative coin!`;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Product link copied to clipboard."
    });
    setShowShareMenu(false);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-gray-900">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-xl"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                      <div className="py-2">
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <Facebook className="w-4 h-4" />
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <Twitter className="w-4 h-4" />
                          <span>Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </button>
                        <button
                          onClick={handleCopyLink}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                        >
                          Copy Link
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-lg">Commemorative Coin</p>
            </div>

            <div className="flex items-center space-x-3">
              {product.status === 'in_stock' && (
                <Badge className="bg-green-100 text-green-800 border-green-300">In Stock</Badge>
              )}
              {product.status === 'limited_stock' && (
                <Badge className="bg-orange-100 text-orange-800 border-orange-300">Limited Stock</Badge>
              )}
              {product.status === 'coming_soon' && (
                <Badge className="bg-gray-100 text-gray-800 border-gray-300">Coming Soon</Badge>
              )}
            </div>

            {product.status !== 'coming_soon' && (
              <div className="text-4xl font-bold text-gray-900">${product.price}</div>
            )}

            <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">Year:</span>
                  <span className="font-medium">{product.year}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Weight className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Ruler className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">Diameter:</span>
                  <span className="font-medium">{product.diameter}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">Material:</span>
                  <span className="font-medium">{product.material}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">Mintage:</span>
                  <span className="font-medium">{product.mintage}</span>
                </div>
              </CardContent>
            </Card>

            {product.status !== 'coming_soon' && (
              <Button size="lg" className="w-full bg-black text-white hover:bg-gray-800">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl">Comments ({comments.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Comment */}
            {user ? (
              <div className="space-y-3">
                <Textarea
                  placeholder="Share your thoughts about this coin..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
                <Button onClick={handleAddComment} className="bg-black text-white hover:bg-gray-800">
                  Post Comment
                </Button>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-3">Please login to post a comment</p>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-4 mt-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-semibold text-gray-900">{comment.username}</span>
                        <span className="text-sm text-gray-500 ml-2">{formatDate(comment.timestamp)}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{comment.likes}</span>
                      </Button>
                    </div>
                    <p className="text-gray-700">{comment.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;