import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MarqueeText.css';

const MarqueeText = ({ text, speed = 1, direction = 'left' }) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const content = marquee.querySelector('.marquee-content');
    const contentWidth = content.offsetWidth;
    const gap = 50;

    // Duplicate content for seamless loop
    const clone = content.cloneNode(true);
    marquee.appendChild(clone);

    const totalWidth = contentWidth + gap;

    const animation = gsap.to(content, {
      x: direction === 'left' ? -totalWidth : totalWidth,
      duration: totalWidth / (50 * speed),
      ease: 'none',
      repeat: -1,
    });

    // Clone animation
    gsap.to(clone, {
      x: direction === 'left' ? -totalWidth : totalWidth,
      duration: totalWidth / (50 * speed),
      ease: 'none',
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, [text, speed, direction]);

  return (
    <div ref={marqueeRef} className="marquee">
      <div className="marquee-content">{text}</div>
    </div>
  );
};

export default MarqueeText;

