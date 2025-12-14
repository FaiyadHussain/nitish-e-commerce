import { gsap } from 'gsap';

// Page transition out
export const pageTransitionOut = (onComplete) => {
  const tl = gsap.timeline({
    onComplete,
  });

  tl.to('.page-transition', {
    y: '-100%',
    duration: 0.6,
    ease: 'power2.inOut',
  });

  return tl;
};

// Page transition in
export const pageTransitionIn = () => {
  const tl = gsap.timeline();

  tl.set('.page-transition', { y: '100%' })
    .to('.page-transition', {
      y: '0%',
      duration: 0.6,
      ease: 'power2.inOut',
    })
    .to('.page-transition', {
      y: '-100%',
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.inOut',
    });

  return tl;
};

// Fade transition
export const fadeTransition = (onComplete) => {
  const tl = gsap.timeline({
    onComplete,
  });

  tl.to('.page-transition', {
    opacity: 1,
    duration: 0.4,
    ease: 'power2.inOut',
  })
    .to('.page-transition', {
      opacity: 0,
      duration: 0.4,
      delay: 0.2,
      ease: 'power2.inOut',
    });

  return tl;
};

