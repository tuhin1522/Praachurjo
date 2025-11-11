import React, { useEffect, useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import Category from '../Category/Category';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    // Fetch user once for all categories
    useEffect(() => {
        fetch("http://localhost:5000/", { credentials: 'include' })
            .then(response => response.json())
            .then(data => setUser(data.user))
            .catch(error => console.error("Error fetching user:", error));
    }, []);

    // Fetch categories
    useEffect(() => {
        setLoading(true);
        fetch('/categories.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load categories');
                }
                return response.json();
            })
            .then(data => {
                // Add mock item counts for demonstration
                const categoriesWithCounts = data.map(cat => ({
                    ...cat,
                    count: Math.floor(Math.random() * 500) + 50 // Random count between 50-550
                }));
                setCategories(categoriesWithCounts);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Filter categories based on search term
    const filteredCategories = useMemo(() => {
        if (!searchTerm.trim()) return categories;
        
        return categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    // Loading skeleton
    const renderSkeleton = () => (
        <>
            {[...Array(10)].map((_, index) => (
                <div key={`skeleton-${index}`} className="flex flex-col items-center justify-center gap-4 p-6 min-h-[200px] bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl animate-pulse">
                    <div className="w-16 h-16 bg-white/20 rounded-full"></div>
                    <div className="w-24 h-4 bg-white/20 rounded"></div>
                    <div className="w-16 h-3 bg-white/20 rounded"></div>
                </div>
            ))}
        </>
    );

    // Empty state
    const renderEmptyState = () => (
        <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl">
            <FiSearch className="text-6xl text-white/60 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">No categories found</h3>
            <p className="text-white/70 text-center mb-6 max-w-md">
                Try adjusting your search or browse all categories
            </p>
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-150"
                >
                    Clear Search
                </button>
            )}
        </div>
    );

    // Error state
    const renderError = () => (
        <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl">
            <div className="text-6xl mb-6">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-3">Failed to load categories</h3>
            <p className="text-white/70 text-center mb-6">{error}</p>
            <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-150"
            >
                Retry
            </button>
        </div>
    );

    return (
        <section className="w-full py-16" aria-label="Product categories">
            <div className="max-w-[1280px] mx-auto px-20">
                {/* Header with Search */}
                <div className="flex items-start justify-between gap-8 mb-12">
                    <div className="flex-1">
                        <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Categories</h2>
                        <p className="text-base text-white/70">
                            {loading 
                                ? 'Loading categories...' 
                                : `Browse our collection of ${categories.length} categories`
                            }
                        </p>
                    </div>
                    
                    <div className="relative w-full max-w-[320px] flex-shrink-0">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg pointer-events-none" aria-hidden="true" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-full py-3 pl-12 pr-12 backdrop-blur-sm bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search categories"
                            disabled={loading}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-white/20 hover:bg-white/30 border-none rounded-full text-white text-lg cursor-pointer transition-all duration-150 hover:scale-110"
                                aria-label="Clear search"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                {/* Loading announcement for screen readers */}
                <div 
                    role="status" 
                    aria-live="polite" 
                    aria-atomic="true"
                    className="sr-only"
                >
                    {loading && 'Loading categories...'}
                    {!loading && !error && `${filteredCategories.length} categories available`}
                </div>

                {/* Categories Grid */}
                {error ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" role="list">
                        {renderError()}
                    </div>
                ) : (
                    <div 
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                        role="list"
                    >
                        {loading ? (
                            renderSkeleton()
                        ) : filteredCategories.length > 0 ? (
                            filteredCategories.map((category, index) => (
                                <Category 
                                    key={category.id} 
                                    category={category}
                                    user={user}
                                    index={index}
                                />
                            ))
                        ) : (
                            renderEmptyState()
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Categories;