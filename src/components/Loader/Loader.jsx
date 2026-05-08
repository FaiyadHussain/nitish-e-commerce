import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);
  const progressContainerRef = useRef(null);
  
  // Array refs for the panels
  const darkPanelsRef = useRef([]);
  const beigePanelsRef = useRef([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'auto';
        if (onComplete) onComplete();
      },
    });

    // Initial setups
    gsap.set(logoRef.current, { opacity: 0, scale: 0.5, y: 50 });
    gsap.set(progressContainerRef.current, { opacity: 0, y: 30 });
    
    // 1. Initial dark curtains stagger sweep UP
    tl.to(darkPanelsRef.current, {
      yPercent: -100,
      duration: 1.5,
      stagger: 0.1,
      ease: 'expo.inOut',
    });

    // 2. Logo dynamic reveal
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.8,
      ease: 'back.out(1.5)',
    }, "-=1.2")
    .to(progressContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, "-=1.5");

    // 3. Loading Progress
    let progressObj = { value: 0 };
    tl.to(progressObj, {
      value: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(progressObj.value);
        if (counterRef.current) counterRef.current.innerText = val + '%';
        if (progressRef.current) progressRef.current.style.width = val + '%';
      }
    });

    // 4. Exit elements
    tl.to([progressContainerRef.current, logoRef.current], {
      opacity: 0,
      y: -50,
      scale: 0.9,
      duration: 0.8,
      ease: 'power3.in',
      stagger: 0.1
    });

    // 5. Final Website Reveal: Beige panels alternate sliding UP and DOWN
    tl.to(beigePanelsRef.current, {
      yPercent: (i) => (i % 2 === 0 ? -100 : 100),
      duration: 1.6,
      stagger: 0.08,
      ease: 'expo.inOut',
    }, "-=0.2");

    // Clean up
    tl.set(loaderRef.current, { display: 'none' });

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader-wrapper">
      {/* Layer 1: Beige panels for the main loader background */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div 
          key={`beige-${i}`} 
          className={`loader-panel beige panel-${i}`}
          ref={el => beigePanelsRef.current[i] = el}
        ></div>
      ))}

      {/* Layer 3: Dark initial entrance panels */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div 
          key={`dark-${i}`} 
          className={`loader-panel dark panel-${i}`}
          ref={el => darkPanelsRef.current[i] = el}
        ></div>
      ))}
      
      {/* Layer 2: Loader Content */}
      <div className="loader-content">
        <img 
          ref={logoRef} 
          src="/J_A-removebg-preview.png" 
          alt="JACOB ATELIER" 
          className="loader-logo-img" 
        />
        <div className="progress-container" ref={progressContainerRef}>
          <div className="loader-progress">
            <div ref={progressRef} className="loader-progress-bar"></div>
          </div>
          <div className="counter" ref={counterRef}>0%</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

