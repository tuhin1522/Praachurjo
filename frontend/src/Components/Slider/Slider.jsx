import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FiShoppingBag, FiArrowRight, FiPause, FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Slider.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("next");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const sliderRef = useRef(null);
  const autoplayRef = useRef(null);
  const progressRefs = useRef([]);

  // Slide data with rich content - memoized to prevent re-renders
  const slides = useMemo(() => [
    {
      id: 1,
      image: "../../../src/assets/img-1.webp",
      eyebrow: "FRESH ARRIVALS",
      title: "Farm-Fresh Groceries Delivered",
      subtitle: "Get premium quality fruits, vegetables, and daily essentials delivered to your doorstep within 2 hours.",
      primaryCTA: { text: "Shop Now", link: "/products" },
      secondaryCTA: { text: "Learn More", link: "/about" },
      overlayPosition: "left",
      textColor: "light"
    },
    {
      id: 2,
      image: "../../../src/assets/img-2.webp",
      eyebrow: "SPECIAL OFFER",
      title: "Save Big on Organic Products",
      subtitle: "Up to 30% off on certified organic groceries. Limited time offer on premium health foods and fresh produce.",
      primaryCTA: { text: "View Deals", link: "/deals" },
      secondaryCTA: { text: "Browse All", link: "/products" },
      overlayPosition: "left",
      textColor: "light"
    },
    {
      id: 3,
      image: "../../../src/assets/img-3.webp",
      eyebrow: "FAST DELIVERY",
      title: "Your Essentials, On Time",
      subtitle: "Same-day delivery available. Order before 3 PM and get your groceries delivered by evening.",
      primaryCTA: { text: "Order Now", link: "/products" },
      secondaryCTA: { text: "Track Order", link: "/track" },
      overlayPosition: "left",
      textColor: "light"
    }
  ], []);

  const totalSlides = slides.length;

  // Navigation functions
  const goToSlide = useCallback((slideIndex, dir = "next") => {
    if (isTransitioning) return;
    setDirection(dir);
    setIsTransitioning(true);
    setCurrentSlide(slideIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    goToSlide(nextIndex, "next");
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex, "prev");
  }, [currentSlide, totalSlides, goToSlide]);

  // Autoplay functionality
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    
    autoplayRef.current = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 5000);
  }, [isPaused, nextSlide]);

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const toggleAutoplay = () => {
    setIsAutoplayActive(!isAutoplayActive);
    setIsPaused(!isAutoplayActive);
  };

  // Touch gesture handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Home") goToSlide(0);
      if (e.key === "End") goToSlide(totalSlides - 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide, goToSlide, totalSlides]);

  // Autoplay management
  useEffect(() => {
    if (isAutoplayActive && !isPaused) {
      startAutoplay();
    } else {
      stopAutoplay();
    }

    return () => stopAutoplay();
  }, [isAutoplayActive, isPaused, currentSlide, startAutoplay]);

  // Intersection Observer - pause when not visible
  useEffect(() => {
    const currentSliderRef = sliderRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsPaused(true);
        } else if (isAutoplayActive) {
          setIsPaused(false);
        }
      },
      { threshold: 0.5 }
    );

    if (currentSliderRef) {
      observer.observe(currentSliderRef);
    }

    return () => {
      if (currentSliderRef) {
        observer.unobserve(currentSliderRef);
      }
    };
  }, [isAutoplayActive]);

  // Preload adjacent images
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    
    [nextIndex, prevIndex].forEach(index => {
      const img = new Image();
      img.src = slides[index].image;
    });
  }, [currentSlide, totalSlides, slides]);

  return (
    <div 
      className="slider-wrapper"
      ref={sliderRef}
    >
      <div
        className="slider-container"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured products slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => isAutoplayActive && setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        <div className="slider-track">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${currentSlide === index ? "slide-active" : ""} ${
                currentSlide === index ? `slide-${direction}` : ""
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalSlides}: ${slide.title}`}
              aria-hidden={currentSlide !== index}
            >
              {/* Background Image with Ken Burns Effect */}
              <div className={`slide-image-container ${currentSlide === index ? "ken-burns" : ""}`}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="slide-image"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`slide-overlay overlay-${slide.overlayPosition}`}></div>

              {/* Content */}
              <div className={`slide-content content-${slide.overlayPosition}`}>
                <div className={`content-inner ${currentSlide === index ? "content-animate" : ""}`}>
                  {/* Eyebrow */}
                  <div className="slide-eyebrow" style={{ animationDelay: "0.1s" }}>
                    {slide.eyebrow}
                  </div>

                  {/* Title */}
                  <h2 className="slide-title" style={{ animationDelay: "0.2s" }}>
                    {slide.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="slide-subtitle" style={{ animationDelay: "0.3s" }}>
                    {slide.subtitle}
                  </p>

                  {/* CTAs */}
                  <div className="slide-ctas" style={{ animationDelay: "0.4s" }}>
                    <Link to={slide.primaryCTA.link} className="cta-primary">
                      <FiShoppingBag className="cta-icon" />
                      <span>{slide.primaryCTA.text}</span>
                      <FiArrowRight className="cta-arrow" />
                    </Link>
                    <Link to={slide.secondaryCTA.link} className="cta-secondary">
                      <span>{slide.secondaryCTA.text}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="slider-arrow slider-arrow-prev"
          onClick={prevSlide}
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <IoIosArrowBack aria-hidden="true" />
        </button>

        <button
          className="slider-arrow slider-arrow-next"
          onClick={nextSlide}
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <IoIosArrowForward aria-hidden="true" />
        </button>

        {/* Progress Indicators */}
        <div className="slider-indicators" role="tablist" aria-label="Slide navigation">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`indicator ${currentSlide === index ? "indicator-active" : ""}`}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={currentSlide === index}
              aria-label={`Go to slide ${index + 1}`}
              aria-controls={`slide-${index}`}
              disabled={isTransitioning}
            >
              <div 
                ref={(el) => (progressRefs.current[index] = el)}
                className={`indicator-progress ${
                  currentSlide === index && isAutoplayActive && !isPaused ? "indicator-progress-active" : ""
                }`}
              ></div>
            </button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="slide-counter" aria-live="polite">
          <span className="counter-current">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="counter-separator">/</span>
          <span className="counter-total">{String(totalSlides).padStart(2, "0")}</span>
        </div>

        {/* Autoplay Control */}
        <button
          className="autoplay-toggle"
          onClick={toggleAutoplay}
          aria-label={isAutoplayActive ? "Pause autoplay" : "Start autoplay"}
          title={isAutoplayActive ? "Pause" : "Play"}
        >
          {isAutoplayActive && !isPaused ? (
            <FiPause aria-hidden="true" />
          ) : (
            <FiPlay aria-hidden="true" />
          )}
        </button>

        {/* Pause Indicator */}
        {isPaused && isAutoplayActive && (
          <div className="pause-indicator" aria-live="polite" aria-atomic="true">
            <FiPause />
            <span className="sr-only">Slideshow paused</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
