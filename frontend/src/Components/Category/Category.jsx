import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Category = ({ category, user, index }) => {
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        
        // Ripple effect
        const card = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Navigate after ripple starts
        setTimeout(() => {
            if (user) {
                navigate(`/products/category/${category.name}`);
            } else {
                navigate('/login');
            }
        }, 200);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    // Format count with commas
    const formatCount = (count) => {
        return count ? count.toLocaleString() : '0';
    };

    return (
        <Link
            to={user ? `/products/category/${category.name}` : '/login'}
            className="relative flex flex-col items-center justify-center gap-4 p-6 min-h-[200px] backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-pink-400 hover:shadow-[0_12px_28px_rgba(236,72,153,0.25)] hover:-translate-y-2 hover:bg-white/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400/30 active:-translate-y-1 group"
            role="listitem"
            aria-label={`${category.name} category, ${category.count || 0} items available`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Icon Container with Gradient Background */}
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-2xl backdrop-blur-sm border border-white/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" aria-hidden="true">
                {imageError ? (
                    <div className="text-3xl font-bold text-white">
                        {category.name.charAt(0).toUpperCase()}
                    </div>
                ) : (
                    <img
                        src={category.image}
                        alt=""
                        className="w-12 h-12 object-contain filter brightness-0 invert transition-transform duration-300"
                        onError={handleImageError}
                        loading="lazy"
                    />
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col items-center gap-2 text-center">
                <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-pink-300">{category.name}</h3>
                {category.count !== undefined && (
                    <div className="text-sm text-white/60 font-medium">
                        <span aria-label={`${category.count} items`}>
                            {formatCount(category.count)} items
                        </span>
                    </div>
                )}
            </div>

            {/* Arrow Icon (shows on hover) */}
            <div className="absolute bottom-6 right-6 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-pink-300 text-xl" aria-hidden="true">
                <FiArrowRight />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" aria-hidden="true"></div>
        </Link>
    );
};

export default Category;