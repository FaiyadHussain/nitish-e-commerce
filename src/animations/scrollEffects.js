import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Navbar background on scroll
export const navbarScroll = (navbar) => {
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top -100',
    end: 'bottom bottom',
    onEnter: () => {
      gsap.to(navbar, {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        duration: 0.3,
      });
    },
    onLeaveBack: () => {
      gsap.to(navbar, {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        duration: 0.3,
      });
    },
  });
};

// Pin element on scroll
export const pinOnScroll = (element, pinStart = 'top top', pinEnd = '+=100%') => {
  ScrollTrigger.create({
    trigger: element,
    start: pinStart,
    end: pinEnd,
    pin: true,
    pinSpacing: true,
  });
};

// Horizontal scroll
export const horizontalScroll = (element, distance = '200%') => {
  gsap.to(element, {
    x: `-${distance}`,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top top',
      end: `+=${distance}`,
      pin: true,
      scrub: 1,
    },
  });
};

// Image parallax
export const imageParallax = (image, speed = 0.5) => {
  gsap.to(image, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: image,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Text reveal on scroll
export const textRevealScroll = (text) => {
  gsap.fromTo(
    text,
    {
      clipPath: 'inset(100% 0 0 0)',
    },
    {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

