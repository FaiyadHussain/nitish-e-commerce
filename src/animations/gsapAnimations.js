import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Text reveal animation
export const textReveal = (element, delay = 0) => {
  gsap.fromTo(
    element,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
    }
  );
};

// Fade in animation
export const fadeIn = (element, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power2.out',
    }
  );
};

// Slide in from left
export const slideInLeft = (element, delay = 0) => {
  gsap.fromTo(
    element,
    {
      x: -100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
    }
  );
};

// Slide in from right
export const slideInRight = (element, delay = 0) => {
  gsap.fromTo(
    element,
    {
      x: 100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
    }
  );
};

// Scale animation
export const scaleIn = (element, delay = 0) => {
  gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      delay,
      ease: 'back.out(1.7)',
    }
  );
};

// Stagger animation for multiple elements
export const staggerFadeIn = (elements, delay = 0, stagger = 0.1) => {
  gsap.fromTo(
    elements,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      stagger,
      ease: 'power2.out',
    }
  );
};

// Scroll triggered animation
export const scrollReveal = (element, options = {}) => {
  const {
    trigger = element,
    start = 'top 80%',
    end = 'bottom 20%',
    animation = 'fade',
  } = options;

  let fromVars = {};
  let toVars = { opacity: 1, duration: 1, ease: 'power2.out' };

  switch (animation) {
    case 'fade':
      fromVars = { opacity: 0 };
      break;
    case 'slideUp':
      fromVars = { y: 100, opacity: 0 };
      toVars = { ...toVars, y: 0 };
      break;
    case 'slideLeft':
      fromVars = { x: -100, opacity: 0 };
      toVars = { ...toVars, x: 0 };
      break;
    case 'slideRight':
      fromVars = { x: 100, opacity: 0 };
      toVars = { ...toVars, x: 0 };
      break;
    case 'scale':
      fromVars = { scale: 0.8, opacity: 0 };
      toVars = { ...toVars, scale: 1 };
      break;
    default:
      fromVars = { opacity: 0 };
  }

  gsap.fromTo(
    element,
    fromVars,
    {
      ...toVars,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions: 'play none none reverse',
      },
    }
  );
};

// Parallax effect
export const parallax = (element, speed = 0.5) => {
  gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

