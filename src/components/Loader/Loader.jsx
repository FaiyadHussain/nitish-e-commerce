import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    // Animate progress
    gsap.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.out',
    });

    // Animate text
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
      }
    );

    // Fade out loader
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 1.5,
    })
      .to(loaderRef.current, {
        display: 'none',
        duration: 0,
      });
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader-content">
        <img 
          ref={textRef} 
          src="/J_A-removebg-preview.png" 
          alt="JACOB ATELIER" 
          className="loader-logo-img" 
        />
        <div className="loader-progress">
          <div ref={progressRef} className="loader-progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

