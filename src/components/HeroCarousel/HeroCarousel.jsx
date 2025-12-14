import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroCarousel.css';

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=2000&q=80',
      alt: 'Luxury Fashion Collection'
    },
    {
      url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2000&q=80',
      alt: 'Premium Style'
    },
    {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2000&q=80',
      alt: 'Elegant Fashion'
    },
    {
      url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=2000&q=80',
      alt: 'Timeless Elegance'
    }
  ];

  useEffect(() => {
    // Auto-rotate carousel
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

  useEffect(() => {
    // Animate carousel transition
    if (carouselRef.current) {
      const slides = carouselRef.current.querySelectorAll('.carousel-slide');
      slides.forEach((slide, index) => {
        if (index === currentIndex) {
          gsap.to(slide, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out'
          });
        } else {
          gsap.to(slide, {
            opacity: 0,
            scale: 1.05,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    }
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  return (
    <div className="hero-carousel">
      <div ref={carouselRef} className="carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="carousel-image"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="carousel-overlay"></div>
            <div className="carousel-gradient"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-nav carousel-prev" onClick={goToPrevious}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button className="carousel-nav carousel-next" onClick={goToNext}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="carousel-progress">
        <div 
          className="carousel-progress-bar"
          style={{ 
            animation: `progress ${4000}ms linear infinite`,
            animationPlayState: 'running'
          }}
        />
      </div>
    </div>
  );
};

export default HeroCarousel;

