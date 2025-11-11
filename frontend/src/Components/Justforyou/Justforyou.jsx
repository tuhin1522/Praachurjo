import React, { useEffect, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import Justforyoucard from "../Justforyoucard/Justforyoucard";

const Justforyou = () => {
  const [products, setProducts] = useState([]);
  const [loading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  console.log(products);
  // Loading skeleton
  const renderSkeleton = () => (
    <>
      {[...Array(8)].map((_, index) => (
        <div key={`skeleton-${index}`} className="flex flex-col backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden animate-pulse">
          <div className="w-full aspect-square bg-white/20"></div>
          <div className="p-5 space-y-3">
            <div className="h-4 w-28 bg-white/20 rounded"></div>
            <div className="h-5 w-4/5 bg-white/20 rounded"></div>
            <div className="h-3 w-24 bg-white/20 rounded"></div>
            <div className="h-7 w-32 bg-white/20 rounded"></div>
            <div className="h-11 w-full bg-white/20 rounded-xl"></div>
          </div>
        </div>
      ))}
    </>
  );

  // Error state
  const renderError = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl">
      <div className="text-6xl mb-6">⚠️</div>
      <h3 className="text-2xl font-bold text-white mb-3">Failed to load products</h3>
      <p className="text-white/70 text-center mb-6">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-150"
      >
        Retry
      </button>
    </div>
  );

  // Empty state
  const renderEmpty = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl">
      <div className="text-6xl mb-6">📦</div>
      <h3 className="text-2xl font-bold text-white mb-3">No products available</h3>
      <p className="text-white/70 text-center">
        Check back soon for new arrivals and deals!
      </p>
    </div>
  );

  return (
    <section className="w-full py-16 pb-20">
      <div className="max-w-[1440px] mx-auto px-20">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl text-white text-3xl shadow-lg shadow-pink-500/30">
              <FiTrendingUp />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Just For You</h2>
              <p className="text-base text-white/70">
                {loading 
                  ? "Loading personalized recommendations..." 
                  : `${products.length} handpicked products based on your preferences`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Loading announcement for screen readers */}
        <div 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
          className="sr-only"
        >
          {loading && "Loading products..."}
          {!loading && !error && `${products.length} products available`}
        </div>

        {/* Products Grid */}
        {error ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" role="list" aria-label="Product recommendations">
            {renderError()}
          </div>
        ) : (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            role="list"
            aria-label="Product recommendations"
          >
            {loading ? (
              renderSkeleton()
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <Justforyoucard 
                  key={product.id} 
                  product={product}
                  index={index}
                />
              ))
            ) : (
              renderEmpty()
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Justforyou;
