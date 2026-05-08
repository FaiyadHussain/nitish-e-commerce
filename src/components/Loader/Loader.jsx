import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const svgPathRef = useRef(null);
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
    gsap.set(logoRef.current, { opacity: 0, scale: 0.85, y: 30 });
    gsap.set(progressContainerRef.current, { opacity: 0, y: 30 });
    
    // Setup SVG for drawing if ref exists
    if (svgPathRef.current) {
      const length = svgPathRef.current.getTotalLength();
      gsap.set(svgPathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: 'transparent',
        stroke: '#111111',
        strokeWidth: 15,
      });
    }

    // 1. Initial dark curtains stagger sweep UP
    tl.to(darkPanelsRef.current, {
      yPercent: -100,
      duration: 1.8,
      stagger: 0.1,
      ease: 'power4.inOut',
    });

    // 2. Logo container dynamic reveal
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, "-=1.2");

    // 3. SVG Line Drawing Effect
    if (svgPathRef.current) {
      tl.to(svgPathRef.current, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'power2.inOut',
      }, "-=1.0")
      .to(svgPathRef.current, {
        fill: '#111111',
        stroke: 'transparent',
        duration: 0.8,
        ease: 'power2.out',
      }, "-=0.8");
    }

    // 4. Progress container reveal
    tl.to(progressContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, "-=2.5");

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
      duration: 1.8,
      stagger: 0.08,
      ease: 'power4.inOut',
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
        <svg 
          className="loader-logo-svg"
          version="1.0" 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
          ref={logoRef}
        >
          <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)">
            <path 
              ref={svgPathRef}
              d="M4155 3718 c-9 -13 -57 -93 -108 -178 -51 -85 -106 -177 -122 -203 -64 -103 -399 -604 -427 -639 l-30 -38 -101 0 c-191 0 -542 -31 -727 -64 -152 -27 -194 -36 -250 -52 -253 -74 -409 -160 -469 -258 -20 -32 -24 -34 -99 -39 -42 -3 -81 -1 -86 3 -5 5 7 30 26 57 96 133 312 554 395 773 68 178 94 333 65 387 -19 34 -67 54 -130 54 -182 1 -603 -244 -825 -481 -94 -100 -142 -175 -163 -252 -13 -47 -12 -57 2 -89 19 -45 70 -74 142 -84 52 -7 249 10 287 25 40 16 -15 24 -75 12 -72 -15 -215 -15 -243 -1 -12 6 -32 21 -45 32 -50 46 -11 164 98 294 183 220 644 511 817 517 121 3 118 -149 -9 -464 -56 -138 -145 -324 -210 -440 -24 -42 -51 -91 -62 -110 -51 -96 -152 -235 -176 -242 -14 -4 -77 -12 -140 -18 -397 -40 -668 -134 -737 -256 -29 -50 -29 -81 1 -125 67 -98 284 -137 439 -79 118 44 266 165 405 330 102 120 101 120 137 120 17 0 60 3 94 6 l61 7 0 -55 c0 -118 117 -224 316 -284 81 -25 312 -25 402 -1 138 38 306 136 468 274 l66 56 112 -12 c136 -13 224 -14 210 -2 -10 10 -179 31 -248 31 -25 0 -46 4 -46 8 0 4 25 32 56 62 30 30 107 119 171 198 l115 142 64 0 c34 0 65 -3 67 -7 3 -5 -12 -46 -33 -93 -53 -121 -107 -275 -121 -348 -14 -77 -3 -112 36 -112 25 0 33 14 15 25 -34 21 14 197 121 439 l42 96 306 0 c168 -1 380 -5 471 -10 91 -4 167 -6 169 -4 21 21 -53 27 -460 35 -244 5 -449 11 -456 14 -14 5 3 45 120 295 19 41 48 104 65 140 16 36 45 99 65 140 86 184 117 252 117 256 0 2 23 49 50 105 28 56 50 107 50 115 0 22 -27 17 -45 -8z m-332 -710 c-48 -106 -103 -224 -123 -263 l-35 -70 -54 -8 c-81 -13 -83 -1 -11 97 60 84 232 342 280 420 51 85 27 9 -57 -176z m-383 -384 c0 -16 -227 -283 -295 -347 l-40 -38 -130 8 c-71 4 -331 8 -577 8 -503 0 -472 -6 -379 78 109 97 342 187 606 232 103 18 419 54 510 58 139 6 305 7 305 1z m-421 -412 l54 -7 -56 -48 c-70 -59 -238 -172 -297 -199 -144 -66 -264 -87 -390 -69 -198 28 -357 128 -390 245 -17 61 -7 84 38 89 56 7 979 -2 1041 -11z m-1409 -21 c0 -27 -221 -256 -306 -317 -193 -138 -355 -151 -483 -40 -36 33 -44 62 -25 102 60 125 298 209 739 258 60 6 75 6 75 -3z"
            />
          </g>
        </svg>
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

