import React, { useEffect, useState } from 'react';
import { FiCheck, FiShoppingCart, FiStar, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Productdetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewStats, setReviewStats] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [isAdding] = useState(false);
    const [isAdded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null); 
    const [carts, setCarts] = useState([]);
    const [store, setStore] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/", { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setUser(data.user);
                setCarts(data.carts);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                console.log("✅ Product details fetched:", data);
            })
            .catch(error => {
                console.error("❌ Error fetching product details:", error);
            });
    }, [id]);
    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}/seller`)
            .then(response => response.json())
            .then(data => {
                setStore(data);
                console.log("✅ Store details fetched:", data);
            })
            .catch(error => {
                console.error("❌ Error fetching store details:", error);
            });
    }, [id]);
    console.log("Store Details:", store);
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/reviews/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("✅ Reviews API Response:", data);
                
                // Handle the response structure from your Express server
                if (data.success && data.reviews) {
                    setReviews(data.reviews);
                    setReviewStats(data.stats);
                    console.log(`✅ Loaded ${data.reviews.length} reviews`);
                    console.log("✅ Review Stats:", data.stats);
                } else if (Array.isArray(data)) {
                    // Fallback if response is just an array
                    setReviews(data);
                    console.log(`✅ Loaded ${data.length} reviews (array format)`);
                } else {
                    setReviews([]);
                    setReviewStats(null);
                    console.log("ℹ️ No reviews found");
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("❌ Error fetching reviews:", error);
                setReviews([]);
                setReviewStats(null);
                setLoading(false);
            });
    }, [id]);

    // Render star rating
    const renderStarRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FiStar key={`full-${i}`} className="text-yellow-500 fill-yellow-500" size={20} />
            );
        }
        
        if (hasHalfStar) {
            stars.push(
                <FiStar key="half" className="text-yellow-500 fill-yellow-500" size={20} style={{ opacity: 0.5 }} />
            );
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <FiStar key={`empty-${i}`} className="text-gray-300" size={20} />
            );
        }
        
        return stars;
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900'>
            <Navbar user={user} carts={carts} setCarts={setCarts} />
            
            {/* Product Details Section */}
            <div className='max-w-[1440px] mx-auto px-6 md:px-20 py-16'>
                <div className='flex flex-col lg:flex-row gap-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8'>
                    {/* Product Image */}
                    <div className='flex-shrink-0'>
                        <img 
                            src={product[0]?.image} 
                            alt={product[0]?.title} 
                            className='rounded-2xl w-full lg:w-[450px] h-auto object-cover shadow-2xl shadow-black/30'
                        />
                    </div>
                    
                    {/* Product Info */}
                    <div className='flex flex-col gap-6 justify-center flex-1'>
                        <h2 className='text-4xl font-bold text-white'>{product[0]?.title}</h2>
                        <p className='text-2xl font-semibold text-pink-300'>Price: ৳{product[0]?.price}</p>
                        
                        {/* Quantity Selector */}
                        <div className='flex gap-4 items-center text-white text-lg'>
                            <span className='font-semibold'>Quantity:</span>
                            <button 
                                className='w-10 h-10 flex items-center justify-center backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold rounded-lg transition-all duration-150'
                                onClick={() => quantity > 0 ? setQuantity(quantity - 1) : null}
                            >
                                -
                            </button>
                            <span className='text-xl font-bold min-w-[40px] text-center'>{quantity}</span>
                            <button 
                                className='w-10 h-10 flex items-center justify-center backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold rounded-lg transition-all duration-150'
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                            {/* Buy Now Button */}
                            <button className='flex-1 py-4 px-6 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-semibold text-lg rounded-xl transition-all duration-150'>
                                Buy Now
                            </button>
                            
                            {/* Add to Cart Button */}
                            <button
                                className={`flex-1 py-4 px-6 flex items-center justify-center gap-3 font-semibold text-lg rounded-xl transition-all duration-150 ${
                                    isAdded 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                disabled={isAdding || isAdded}
                                aria-busy={isAdding}
                            >
                                {isAdded ? (
                                    <>
                                        <FiCheck className="text-xl" aria-hidden="true" />
                                        <span>Added to Cart</span>
                                    </>
                                ) : (
                                    <>
                                        <FiShoppingCart className="text-xl" aria-hidden="true" />
                                        <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Seller/Store Section */}
                <div className='mt-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden'>
                    <div className='bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 border-b border-white/20 px-8 py-6'>
                        <h2 className='text-3xl font-bold text-white mb-4'>Sold By</h2>
                        <div className='flex items-center gap-4'>
                            {/* Seller Avatar */}
                            <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-200'>
                                {store[0]?.logo ? (
                                    <img 
                                        src={store[0]?.logo} 
                                        alt={store[0]?.store_name} 
                                        className='w-full h-full object-cover'
                                    />
                                ) : (
                                    <span>{store[0]?.store_name?.charAt(0)?.toUpperCase() || 'S'}</span>
                                )}
                            </div>
                            
                            {/* Seller Name and Badge */}
                            <div className='flex-1'>
                                <div className='flex items-center gap-3 mb-1'>
                                    <h2 className='text-2xl font-bold text-white'>
                                        {store[0]?.store_name || 'Official Store'}
                                    </h2>
                                    <span className='px-3 py-1 bg-green-500/20 border border-green-400/50 text-green-300 text-xs font-semibold rounded-full'>
                                        ✓ Verified
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='flex gap-0.5'>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <span key={index} className={`text-base ${index < Math.floor(store[0]?.rating || 4.5) ? 'text-yellow-400' : 'text-white/30'}`}>★</span>
                                        ))}
                                    </div>
                                    <span className='text-white/70 text-sm'>
                                        {store[0]?.rating || '4.5'} Rating
                                    </span>
                                </div>
                            </div>
                            
                            {/* View Store Button */}
                            <button className='px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all duration-200'>
                                View Store
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className='mt-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8'>
                    <h1 className='text-3xl font-bold text-white mb-6'>Product Description</h1>
                    <p className='text-lg text-white/80 leading-relaxed'>{product[0]?.description}</p>
                </div>

                {/* Review Statistics */}
                {reviewStats && reviewStats.total > 0 && (
                    <div className='mt-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8'>
                        <h2 className='text-3xl font-bold text-white mb-6'>Review Summary</h2>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {/* Overall Rating */}
                            <div className='flex flex-col items-center justify-center p-6 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl'>
                                <div className='text-5xl font-bold text-white mb-2'>
                                    {reviewStats.overallRating.toFixed(1)}
                                </div>
                                <div className='flex gap-1 mb-2'>
                                    {renderStarRating(reviewStats.overallRating)}
                                </div>
                                <span className='text-sm text-white/70'>
                                    {reviewStats.percentage}% Satisfaction
                                </span>
                            </div>

                            {/* Positive Reviews */}
                            <div className='flex items-center gap-4 p-6 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl'>
                                <div className='w-16 h-16 flex items-center justify-center bg-green-500/20 rounded-full'>
                                    <FiThumbsUp className='text-green-400' size={28} />
                                </div>
                                <div>
                                    <div className='text-4xl font-bold text-green-400'>
                                        {reviewStats.positive}
                                    </div>
                                    <div className='text-sm text-white/70'>
                                        Positive Reviews
                                    </div>
                                </div>
                            </div>

                            {/* Negative Reviews */}
                            <div className='flex items-center gap-4 p-6 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl'>
                                <div className='w-16 h-16 flex items-center justify-center bg-red-500/20 rounded-full'>
                                    <FiThumbsDown className='text-red-400' size={28} />
                                </div>
                                <div>
                                    <div className='text-4xl font-bold text-red-400'>
                                        {reviewStats.negative}
                                    </div>
                                    <div className='text-sm text-white/70'>
                                        Negative Reviews
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Reviews with Sentiment Analysis */}
                <div className='mt-10 mb-20 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8'>
                <h1 className='text-3xl font-bold text-white mb-6'>
                    Customer Reviews ({reviews.length})
                </h1>
                
                {loading ? (
                    <div className='text-center py-10'>
                        <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400'></div>
                        <p className='mt-4 text-white/70'>Loading reviews...</p>
                    </div>
                ) : reviews.length > 0 ? (
                    <div className='space-y-4'>
                        {reviews.map((review) => (
                            <div 
                                key={review.id} 
                                className="p-6 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-200"
                            >
                                <div className='flex justify-between items-start mb-3'>
                                    <div className='flex-1'>
                                        {/* Star Rating */}
                                        <div className='flex gap-1 mb-2'>
                                            {Array.from({ length: review.number_of_star || 0 }).map((_, index) => (
                                                <FiStar 
                                                    key={`filled-${index}`} 
                                                    className="text-yellow-500 fill-yellow-500" 
                                                    size={20}
                                                />
                                            ))}
                                            {Array.from({ length: 5 - (review.number_of_star || 0) }).map((_, index) => (
                                                <FiStar 
                                                    key={`empty-${index}`} 
                                                    className="text-gray-300" 
                                                    size={20}
                                                />
                                            ))}
                                        </div>
                                        
                                        {/* Reviewer and Date */}
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {review.reviewer}
                                        </h3>
                                        <p className="text-sm text-gray-600">{review.date}</p>
                                    </div>

                                    {/* Sentiment Badge */}
                                    {review.sentiment && (
                                        <div 
                                            className='px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-3 shadow-md'
                                            style={{ 
                                                backgroundColor: review.sentiment_color || '#6b7280',
                                                color: 'white'
                                            }}
                                        >
                                            <span className='text-2xl'>
                                                {review.sentiment === 'positive' ? '😊' : '😞'}
                                            </span>
                                            <div className='flex flex-col items-start'>
                                                <span className='text-base'>
                                                    {review.sentiment.toUpperCase()}
                                                </span>
                                                {review.confidence && (
                                                    <span className='text-xs opacity-90'>
                                                        {typeof review.confidence === 'number' 
                                                            ? review.confidence.toFixed(1) 
                                                            : parseFloat(review.confidence).toFixed(1)}% confident
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Review Text with Sentiment Color */}
                                <p 
                                    className={`text-lg font-medium leading-relaxed mt-4 ${
                                        review.sentiment === 'positive' ? 'text-green-300' : 'text-red-300'
                                    }`}
                                >
                                    {review.review_description}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-12 backdrop-blur-sm bg-white/5 rounded-2xl'>
                        <div className='text-6xl mb-4'>💬</div>
                        <p className='text-white/70 text-lg'>
                            No reviews yet. Be the first to review this product!
                        </p>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default Productdetails;