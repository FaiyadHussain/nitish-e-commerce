import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AnimatedBackground.css';

const AnimatedBackground = ({ variant = 'default', intensity = 'medium' }) => {
  const bgRef = useRef(null);
  const particlesRef = useRef(null);
  const gradientRef = useRef(null);
  const shapesRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animated background gradient on scroll
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundPosition: '0% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }

    // Floating particles animation
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: 'random(-150, 150)',
          x: 'random(-80, 80)',
          rotation: 'random(0, 360)',
          duration: 'random(4, 8)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.15,
        });
      });
    }

    // Animated gradient overlay
    if (gradientRef.current) {
      gsap.to(gradientRef.current, {
        backgroundPosition: '100% 100%',
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }

    // Floating shapes animation
    if (shapesRef.current) {
      const shapes = shapesRef.current.querySelectorAll('.floating-shape');
      shapes.forEach((shape, index) => {
        gsap.to(shape, {
          y: 'random(-200, 200)',
          x: 'random(-100, 100)',
          rotation: 'random(0, 360)',
          scale: 'random(0.8, 1.2)',
          duration: 'random(8, 15)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.3,
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const particleCount = intensity === 'high' ? 30 : intensity === 'low' ? 15 : 25;
  const shapeCount = intensity === 'high' ? 8 : intensity === 'low' ? 4 : 6;

  return (
    <div ref={bgRef} className={`animated-background animated-background-${variant}`}>
      <div ref={particlesRef} className="particles-container">
        {[...Array(particleCount)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      <div ref={shapesRef} className="shapes-container">
        {[...Array(shapeCount)].map((_, i) => (
          <div 
            key={i} 
            className="floating-shape"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>
      
      <div ref={gradientRef} className="gradient-overlay"></div>
      <div className="gradient-mesh"></div>
    </div>
  );
};

export default AnimatedBackground;
