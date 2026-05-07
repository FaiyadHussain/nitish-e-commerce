import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import './MobileHome.css';

const MobileHome = () => {
  const heroRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const productStoryRef = useRef(null);
  const menWomenRef = useRef(null);
  const collectionCardsRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageScrollRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Mobile now uses the shared HeroCarousel for pic/video sequence.
    // No rotating background interval required here.

    // Hero Section Animation
    if (heroRef.current) {
      const title = heroRef.current.querySelector('.hero-brand-name');
      const tagline = heroRef.current.querySelector('.hero-tagline');
      const image = heroRef.current.querySelector('.hero-image');

      gsap.fromTo(
        title,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' }
      );

      gsap.fromTo(
        tagline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power2.out' }
      );

      gsap.fromTo(
        image,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, delay: 0.2, ease: 'power2.out' }
      );
    }

    // Scroll Indicator Animation
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }

    // Product Story Section
    if (productStoryRef.current) {
      const text = productStoryRef.current.querySelector('.product-story-text');
      const image = productStoryRef.current.querySelector('.product-story-image');

      gsap.to(image, {
        y: -100,
        scrollTrigger: {
          trigger: productStoryRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.fromTo(
        text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: productStoryRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Men/Women Split Section
    if (menWomenRef.current) {
      const menSection = menWomenRef.current.querySelector('.men-section');
      const womenSection = menWomenRef.current.querySelector('.women-section');

      [menSection, womenSection].forEach((section) => {
        const text = section.querySelector('.section-text');
        const image = section.querySelector('.section-bg-image');

        gsap.fromTo(
          text,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.to(image, {
          scale: 1.1,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }

    // Collection Cards
    if (collectionCardsRef.current) {
      const cards = collectionCardsRef.current.querySelectorAll('.collection-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    // Double Description Section
    if (descriptionRef.current) {
      const desc1 = descriptionRef.current.querySelector('.description-1');
      const desc2 = descriptionRef.current.querySelector('.description-2');

      gsap.fromTo(
        desc1,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: desc1,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        desc2,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: desc2,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Full Image Scroll Experience
    if (imageScrollRef.current) {
      const image = imageScrollRef.current.querySelector('.scroll-image');
      const text = imageScrollRef.current.querySelector('.scroll-text');

      gsap.fromTo(
        image,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          scrollTrigger: {
            trigger: imageScrollRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        text,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: imageScrollRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Final CTA
    if (ctaRef.current) {
      const cta = ctaRef.current.querySelector('.final-cta-content');
      gsap.fromTo(
        cta,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const collections = [
    { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', link: '/shop?category=T-Shirts' },
    { name: 'Shirts', image: 'https://images.unsplash.com/photo-1594938291221-94f18e0a0bde?w=800&q=80', link: '/shop?category=Shirts' },
    { name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', link: '/shop?category=Hoodies' },
    { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', link: '/shop?category=Jeans' },
  ];

  return (
    <div className="mobile-home">
      <AnimatedBackground variant="default" intensity="low" />

      {/* SECTION 1: FULL-SCREEN HERO */}
      <section ref={heroRef} className="hero-section-mobile">
        <div className="hero-image-wrapper">
          {/* Full-screen hero carousel (uses same pic–video sequence as desktop) */}
          <HeroCarousel />

          <div className="hero-overlay"></div>
        </div>

        {/* Brand images row */}
        {/* <div className="mobile-brand-row">
          <img src="/nitish_brand-1.JPG" alt="brand 1" className="mobile-brand-img" />
          <img src="/nitish_brand-2.JPG" alt="brand 2" className="mobile-brand-img" />
          <img src="/nitish_brand-3.JPG" alt="brand 3" className="mobile-brand-img" />
        </div> */}

        <div className="hero-content-mobile">
          <h1 className="hero-brand-name">JACOB ATELIER</h1>
          <p className="hero-tagline">Timeless Elegance</p>
        </div>

        <div ref={scrollIndicatorRef} className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* SECTION 2: PRODUCT STORY */}
      <section ref={productStoryRef} className="product-story-section">
        <div className="product-story-image">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
            alt="Product Story"
          />
        </div>
        <div className="product-story-text">
          <h2 className="product-name">Premium Collection</h2>
          <p className="product-description">
            Crafted with precision, designed for those who appreciate timeless elegance
          </p>
        </div>
      </section>

      {/* SECTION 3: MEN / WOMEN SPLIT */}
      <section ref={menWomenRef} className="men-women-split">
        <Link to="/men" className="men-section">
          <div className="section-bg-image">
            <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80" alt="Men's Collection" />
          </div>
          <div className="section-overlay"></div>
          <div className="section-text">
            <h2>MEN</h2>
            <p>Explore Collection</p>
          </div>
        </Link>
        <Link to="/women" className="women-section">
          <div className="section-bg-image">
            <img src="https://images.unsplash.com/photo-1594938291221-94f18e0a0bde?w=800&q=80" alt="Women's Collection" />
          </div>
          <div className="section-overlay"></div>
          <div className="section-text">
            <h2>WOMEN</h2>
            <p>Explore Collection</p>
          </div>
        </Link>
      </section>

      {/* SECTION 4: COLLECTION CARDS */}
      <section ref={collectionCardsRef} className="collection-cards-section">
        <div className="collection-cards-container">
          {collections.map((collection, index) => (
            <Link key={index} to={collection.link} className="collection-card">
              <div className="card-image">
                <img src={collection.image} alt={collection.name} />
                <div className="card-overlay"></div>
              </div>
              <h3 className="card-name">{collection.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 5: DOUBLE DESCRIPTION */}
      <section ref={descriptionRef} className="description-section">
        <div className="description-bg">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" alt="Brand Story" />
        </div>
        <div className="description-1">
          <h2>Premium Fabric</h2>
          <p>
            We source only the finest materials from around the world, ensuring
            every piece meets our exacting standards of quality and comfort.
          </p>
        </div>
        <div className="description-2">
          <h2>Brand Philosophy</h2>
          <p>
            We believe in creating clothing that transcends trends, pieces that
            become cherished staples in your wardrobe for years to come.
          </p>
        </div>
      </section>

      {/* SECTION 6: FULL IMAGE SCROLL */}
      <section ref={imageScrollRef} className="image-scroll-section">
        <div className="scroll-image">
          <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80" alt="Fashion" />
        </div>
        <div className="scroll-text">
          <h2>Timeless Style</h2>
          <p>Where elegance meets modern sophistication</p>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section ref={ctaRef} className="final-cta-section">
        <div className="final-cta-content">
          <h2>Ready to Explore?</h2>
          <p>Discover our complete collection</p>
          <Link to="/shop">
            <AnimatedButton variant="primary" size="lg">
              Explore Collection
            </AnimatedButton>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MobileHome;
