import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ScrollControls, Environment, Stars } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { textReveal, scrollReveal, staggerFadeIn, fadeIn } from '../../animations/gsapAnimations';
import HeroModel from '../../three/HeroModel';
import ScrollCharacter from '../../three/ScrollCharacter';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import MarqueeText from '../../components/MarqueeText/MarqueeText';
import ProductCard from '../../components/ProductCard/ProductCard';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import MobileHome from './MobileHome';
import { products } from '../../data/products';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const productsRef = useRef(null);
  const rightSideRef = useRef(null);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    if (titleRef.current) {
      textReveal(titleRef.current, 0.2);
    }
    if (subtitleRef.current) {
      textReveal(subtitleRef.current, 0.4);
    }
    if (buttonRef.current) {
      fadeIn(buttonRef.current, 0.6);
    }

    // Hero carousel animation
    if (rightSideRef.current) {
      const carousel = rightSideRef.current.querySelector('.hero-carousel');
      if (carousel) {
        gsap.fromTo(
          carousel,
          {
            opacity: 0,
            scale: 0.95,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            delay: 0.3,
            ease: 'power3.out',
          }
        );
      }
    }

    // Carousel parallax on scroll
    if (rightSideRef.current) {
      const carousel = rightSideRef.current.querySelector('.hero-carousel');
      if (carousel) {
        gsap.to(carousel, {
          scale: 1.05,
          y: -30,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }

    // Products section with scroll trigger
    if (productsRef.current) {
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: 'top 80%',
        onEnter: () => {
          const productCards = productsRef.current.querySelectorAll('.product-card');
          staggerFadeIn(productCards, 0, 0.1);
        },
      });
    }

    // Scroll animations for hero
    scrollReveal(heroRef.current, { animation: 'fade' });

    // Parallax effect for right side on scroll
    if (rightSideRef.current) {
      gsap.to(rightSideRef.current, {
        y: -150,
        rotation: 2,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Animate crafting image on scroll
    const craftingImage = document.querySelector('.crafting-image-container');
    if (craftingImage) {
      gsap.fromTo(
        craftingImage,
        { opacity: 0, scale: 0.9, x: 50 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: craftingImage,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animate new sections on scroll
    const sections = document.querySelectorAll('.new-collection, .stats-section, .newsletter-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Animate showcase items
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Animate stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat) => {
      const finalValue = stat.textContent;
      const numericValue = parseInt(finalValue.replace(/\D/g, ''));
      const suffix = finalValue.replace(/\d/g, '');
      
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
          gsap.to({ value: 0 }, {
            value: numericValue,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              stat.textContent = Math.round(this.targets()[0].value) + suffix;
            },
          });
        },
      });
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const featuredProducts = products.slice(0, 4);

  // Show mobile version on mobile devices
  if (isMobile) {
    return <MobileHome />;
  }

  return (
    <div className="home">
      <AnimatedBackground />
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 ref={titleRef} className="hero-title">
              Timeless Elegance
            </h1>
            <p ref={subtitleRef} className="hero-subtitle">
              Discover luxury fashion that transcends trends
            </p>
            <div ref={buttonRef} className="hero-buttons">
              <Link to="/shop">
                <AnimatedButton variant="primary" size="lg">
                  Shop Now
                </AnimatedButton>
              </Link>
              <Link to="/about">
                <AnimatedButton variant="outline" size="lg">
                  Learn More
                </AnimatedButton>
              </Link>
            </div>
          </div>
          <div className="hero-right-side">
            <div ref={rightSideRef} className="hero-animated-content">
              {/* Hero Carousel */}
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="marquee-section">
        <MarqueeText text="JACOB ATELIER • PREMIUM QUALITY • TIMELESS STYLE • " />
      </section>

      {/* Featured Products */}
      <section className="featured-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Collection</h2>
            <p className="section-subtitle">
              Curated pieces that define modern luxury
            </p>
          </div>
          <div ref={productsRef} className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-footer">
            <Link to="/shop">
              <AnimatedButton variant="outline">View All Products</AnimatedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview section-padding">
        <div className="container">
          <div className="about-preview-content">
            <div className="about-preview-text">
              <h2>Crafting Excellence</h2>
              <p>
                We believe in creating clothing that stands the test of time.
                Each piece is carefully designed and crafted with attention to
                detail, using only the finest materials.
              </p>
              <Link to="/about">
                <AnimatedButton variant="primary">Our Story</AnimatedButton>
              </Link>
            </div>
            <div className="about-preview-image">
              <div className="crafting-image-container">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2000&q=80"
                  alt="Crafting Excellence"
                  className="crafting-image"
                  loading="lazy"
                />
                <div className="crafting-image-overlay"></div>
                <div className="crafting-image-shine"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Collection Section */}
      <section className="new-collection section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">
              Latest additions to our luxury collection
            </p>
          </div>
          <div className="collection-showcase">
            <div className="showcase-item showcase-large">
              <div className="showcase-image">
                <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800" alt="Collection" />
              </div>
              <div className="showcase-content">
                <h3>Spring Collection</h3>
                <p>Fresh designs for the new season</p>
                <Link to="/shop">
                  <AnimatedButton variant="outline">Explore</AnimatedButton>
                </Link>
              </div>
            </div>
            <div className="showcase-item">
              <div className="showcase-image">
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800" alt="Collection" />
              </div>
              <div className="showcase-content">
                <h3>Limited Edition</h3>
                <Link to="/shop">
                  <AnimatedButton variant="outline">Shop Now</AnimatedButton>
                </Link>
              </div>
            </div>
            <div className="showcase-item">
              <div className="showcase-image">
                <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800" alt="Collection" />
              </div>
              <div className="showcase-content">
                <h3>Premium Line</h3>
                <Link to="/shop">
                  <AnimatedButton variant="outline">Discover</AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section-padding">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3 className="stat-number">10K+</h3>
              <p className="stat-label">Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">500+</h3>
              <p className="stat-label">Premium Products</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">50+</h3>
              <p className="stat-label">Countries Served</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">15+</h3>
              <p className="stat-label">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section section-padding">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay in Style</h2>
            <p>Subscribe to our newsletter for exclusive offers and latest trends</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" />
              <AnimatedButton type="submit" variant="primary">Subscribe</AnimatedButton>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

