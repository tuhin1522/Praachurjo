import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiStar, FiCheck } from "react-icons/fi";

const Justforyoucard = ({ product, index }) => {
  const { cart, setCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);

  // Check if item is already in cart
  useEffect(() => {
    const isInCart = cart.some(item => item.id === product.id);
    setIsAdded(isInCart);
  }, [cart, product.id]);


  // Handle add to cart with animation
  const handleAddToCart = (e) => {
    e.preventDefault();
    
    if (isAdding || isAdded) return;

    setIsAdding(true);

    // Add ripple effect
    createRipple(e, e.currentTarget);

    // Simulate API call delay
    setTimeout(() => {
      const newCart = [...cart, product];
      const uniqueCart = Array.from(
        new Map(newCart.map(item => [item.id, item])).values()
      );
      setCart(uniqueCart);
      
      setIsAdding(false);
      setIsAdded(true);

      // Reset success state after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 800);
  };

  // Ripple effect function
  const createRipple = (event, button) => {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  // Toggle wishlist
  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Calculate discounted price
  const getDiscountedPrice = () => {
    if (product.discount) {
      return (product.price * (1 - product.discount / 100)).toFixed(2);
    }
    return product.price;
  };

  // Render star rating
  const renderStars = () => {
    const rating = parseFloat(product.rating);
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={i <= Math.floor(rating) ? "star-filled" : "star-empty"}
          aria-hidden="true"
        />
      );
    }
    
    return stars;
  };

  return (
    <article
      ref={cardRef}
      className="flex flex-col backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:border-pink-400 hover:shadow-[0_12px_28px_rgba(236,72,153,0.25)] hover:-translate-y-1 transition-all duration-300 group"
      role="listitem"
    >
      {/* Image Container */}
      <Link
        to={`/products/${product.id}`}
        className="relative block w-full aspect-square overflow-hidden bg-white/5"
        aria-label={`View details for ${product.title}`}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-lg">New</span>
          )}
          {product.discount && (
            <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">-{product.discount}%</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/30 rounded-full transition-all duration-200 ${isWishlisted ? 'bg-pink-500 border-pink-500 text-white' : 'text-white'}`}
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
        >
          <FiHeart className={`text-lg ${isWishlisted ? 'fill-current' : ''}`} aria-hidden="true" />
        </button>

        {/* Product Image */}
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            <span>📦</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-3">
        {/* Rating */}
        {product.rating && (
          <div 
            className="flex items-center gap-2"
            aria-label={`Rated ${product.rating} out of 5 stars`}
          >
            <div className="flex items-center gap-1 text-yellow-400">
              {renderStars()}
            </div>
            <span className="text-xs text-white/60">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-white line-clamp-2 hover:text-pink-300 transition-colors duration-200" title={product.title}>
            {product.title}
          </h3>
        </Link>

        {/* Category */}
        {product.category && (
          <div className="flex items-center">
            <span className="text-sm text-white/50 font-medium">{product.category}</span>
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-2xl font-bold text-white">
            ৳{getDiscountedPrice()}
          </span>
          {product.discount && (
            <>
              <span className="text-sm text-white/50 line-through">
                ৳{product.price}
              </span>
              <span className="text-xs text-pink-300 font-semibold">
                Save ৳{(product.price - getDiscountedPrice()).toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* View Details Button */}
        <Link to={`/products/${product.id}`}>
          <button className="w-full py-3 px-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-semibold rounded-xl transition-all duration-150 mb-2">
            View Details
          </button>
        </Link>
        
        {/* Add to Cart Button */}
        <button
          className={`w-full py-3 px-4 flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 ${
            isAdded 
              ? 'bg-green-500 text-white' 
              : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
          } disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden`}
          onClick={handleAddToCart}
          disabled={isAdding || isAdded}
          aria-label={`Add ${product.title} to cart for ${getDiscountedPrice()} Taka`}
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

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {isAdding && "Adding to cart..."}
        {isAdded && "Item added to cart successfully"}
      </div>
    </article>
  );
};

export default Justforyoucard;
