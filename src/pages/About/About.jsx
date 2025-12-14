import { useEffect, useRef } from 'react';
import { scrollReveal, textReveal } from '../../animations/gsapAnimations';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import './About.css';

const About = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      textReveal(heroRef.current, 0.2);
    }
    if (contentRef.current) {
      scrollReveal(contentRef.current, { animation: 'fade' });
    }
  }, []);

  return (
    <div className="about-page">
      <AnimatedBackground variant="about" intensity="low" />
      <div className="about-hero">
        <h1 ref={heroRef}>About Us</h1>
      </div>

      <div className="container">
        <div ref={contentRef} className="about-content">
          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded with a vision to redefine luxury fashion, we create
              timeless pieces that blend elegance with modern sophistication.
              Every garment is crafted with meticulous attention to detail,
              using only the finest materials sourced from around the world.
            </p>
            <p>
              We believe that true luxury lies not in trends, but in pieces
              that stand the test of time. Our collections are designed to
              become cherished staples in your wardrobe, pieces you'll reach
              for again and again.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Quality</h3>
                <p>
                  We never compromise on quality. Every piece is carefully
                  selected and crafted to meet our exacting standards.
                </p>
              </div>
              <div className="value-item">
                <h3>Sustainability</h3>
                <p>
                  We're committed to sustainable practices, from sourcing
                  materials to our production processes.
                </p>
              </div>
              <div className="value-item">
                <h3>Elegance</h3>
                <p>
                  We believe in timeless elegance that transcends fleeting
                  trends and speaks to your personal style.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              To empower individuals to express their unique style through
              thoughtfully designed, high-quality clothing that celebrates both
              tradition and innovation. We're not just selling clothes—we're
              curating a lifestyle of refined elegance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

