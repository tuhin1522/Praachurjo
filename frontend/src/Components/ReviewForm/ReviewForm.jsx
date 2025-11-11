import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FiSend, FiStar } from 'react-icons/fi';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [reviewer, setReviewer] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentimentPreview, setSentimentPreview] = useState(null);

  const analyzeSentiment = async () => {
    if (!reviewText.trim()) return;

    try {
      const response = await fetch('http://localhost:8000/api/analyze-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reviewText })
      });

      const data = await response.json();
      if (data.success) {
        setSentimentPreview(data.analysis);
      }
    } catch (error) {
      console.error('Sentiment analysis preview failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewer.trim() || !reviewText.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/api/reviews/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          reviewer: reviewer.trim(),
          review_description: reviewText.trim()
        })
      });

      const data = await response.json();

      if (data.success) {
        const sentiment = data.sentiment_analysis;
        
        toast.success(
          `Review added! Sentiment: ${sentiment.sentiment} (${sentiment.rating}★)`,
          { position: 'top-center' }
        );

        // Reset form
        setReviewer('');
        setReviewText('');
        setSentimentPreview(null);

        // Callback to refresh reviews
        if (onReviewAdded) onReviewAdded();
      }
    } catch (error) {
      toast.error('Failed to submit review');
      console.error('Review submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Reviewer Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#2fa95b] transition"
            placeholder="Enter your name"
            maxLength={100}
          />
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
              setSentimentPreview(null);
            }}
            onBlur={analyzeSentiment}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#2fa95b] transition resize-none"
            placeholder="Share your experience with this product..."
            rows={4}
            maxLength={1000}
          />
          <div className="text-xs text-gray-500 mt-1 text-right">
            {reviewText.length}/1000 characters
          </div>
        </div>

        {/* Sentiment Preview */}
        {sentimentPreview && (
          <div className={`p-4 rounded-lg border-2 ${
            sentimentPreview.sentiment === 'positive' 
              ? 'bg-green-50 border-green-300' 
              : 'bg-red-50 border-red-300'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold" style={{ color: sentimentPreview.color }}>
                  Predicted Sentiment: {sentimentPreview.sentiment.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">
                  Confidence: {(sentimentPreview.confidence * 100).toFixed(1)}%
                </p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: sentimentPreview.rating }).map((_, i) => (
                  <FiStar key={i} className="text-yellow-500 fill-yellow-500" size={20} />
                ))}
                {Array.from({ length: 5 - sentimentPreview.rating }).map((_, i) => (
                  <FiStar key={i} className="text-gray-300" size={20} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2fa95b] hover:bg-[#248a49]'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            <>
              <FiSend />
              Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;