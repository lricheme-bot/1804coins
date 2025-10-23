import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';

const ProductReviews = ({ productId, productName }) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState([
    {
      id: '1',
      name: 'Marie Joseph',
      rating: 5,
      comment: 'Beautiful commemorative coin! The detail is amazing and it arrived quickly. Proud to own a piece of Haitian history.',
      date: '2025-01-05'
    },
    {
      id: '2',
      name: 'Jean Pierre',
      rating: 5,
      comment: 'Excellent quality and craftsmanship. This coin is a wonderful tribute to our heroes.',
      date: '2025-01-03'
    }
  ]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    const review = {
      id: Date.now().toString(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    // Add to local state (in production, this would call API)
    setReviews([review, ...reviews]);
    
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback!",
    });

    // Reset form
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const renderStars = (rating, interactive = false, onRate = null) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? 'fill-orange-500 text-orange-500'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Reviews Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Write a Review
            </Button>
          </div>

          {/* Average Rating */}
          <div className="flex items-center space-x-4 bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600">{averageRating}</div>
              <div className="text-sm text-gray-600 mt-1">out of 5</div>
            </div>
            <div className="flex-1">
              {renderStars(Math.round(averageRating))}
              <p className="text-gray-600 mt-2">Based on {reviews.length} reviews</p>
            </div>
          </div>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Write Your Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  required
                  placeholder="Enter your name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Your Rating</Label>
                <div className="mt-2">
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview({ ...newReview, rating })
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="comment">Your Review</Label>
                <Textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  required
                  placeholder="Share your experience with this product..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div className="flex space-x-3">
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
                  Submit Review
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {reviews.length === 0 && !showReviewForm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No reviews yet. Be the first to review!</p>
            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Write the First Review
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;
