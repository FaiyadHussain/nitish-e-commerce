import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroCarousel.css';

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);

  // slides: mix of video and image. Sequence: video(brand1) -> image(brand2) -> video(brand1) -> image(brand3)
  const slides = [
    { type: 'video', src: '/nitish-e-vdo-mp4.mp4', poster: '/nitish_brand-1.JPG', alt: 'Brand Video' },
    { type: 'image', url: '/nitish_brand-2.JPG', alt: 'Premium Style' },
    { type: 'video', src: '/nitish-e-vdo-mp4.mp4', poster: '/nitish_brand-1.JPG', alt: 'Brand Video' },
    { type: 'image', url: '/nitish_brand-3.JPG', alt: 'Elegant Fashion' },
  ];

  useEffect(() => {
    let mounted = true;

    const schedule = (index) => {
      if (!mounted) return;
      const slide = slides[index];
      const duration = slide.type === 'video' ? 2000 : 3500; // video 2s, images ~3.5s
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, duration);
    };

    // initial schedule
    schedule(0);

    return () => {
      mounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Animate carousel transition
    if (carouselRef.current) {
      const elems = carouselRef.current.querySelectorAll('.carousel-slide');
      elems.forEach((el, index) => {
        if (index === currentIndex) {
          gsap.to(el, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' });
        } else {
          gsap.to(el, { opacity: 0, scale: 1.03, duration: 0.5, ease: 'power2.out' });
        }
      });

      // control video playback: pause all videos, play the active one if any
      const videos = carouselRef.current.querySelectorAll('video');
      videos.forEach((v) => {
        try {
          v.pause();
        } catch (e) {}
      });
      const active = carouselRef.current.querySelector('.carousel-slide.active');
      if (active) {
        const activeVideo = active.querySelector('video');
        if (activeVideo) {
          // muted videos should autoplay; ensure play() is called
          activeVideo.currentTime = 0;
          activeVideo.play().catch(() => {});
        }
      }

      // reschedule next based on current slide type
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const slide = slides[currentIndex];
      const duration = slide.type === 'video' ? 2000 : 3500;
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div className="hero-carousel">
      <div ref={carouselRef} className="carousel-container">
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}>
            {slide.type === 'image' ? (
              <img src={slide.url} alt={slide.alt} className="carousel-image" loading={index === 0 ? 'eager' : 'lazy'} />
            ) : (
              <video className="carousel-image" src={slide.src} poster={slide.poster} muted playsInline preload="auto" />
            )}
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
        {slides.map((_, index) => (
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
            animation: `progress ${slides[currentIndex].type === 'video' ? 2000 : 3500}ms linear infinite`,
            animationPlayState: 'running'
          }}
        />
      </div>
    </div>
  );
};

export default HeroCarousel;

