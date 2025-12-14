import { motion } from 'framer-motion';
import { useRef } from 'react';
import './AnimatedButton.css';

const AnimatedButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const buttonRef = useRef(null);
  const lastClickTime = useRef(0);

  const buttonVariants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
  };

  const sizeVariants = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  const handleClick = (e) => {
    // Prevent double-tap on mobile
    const now = Date.now();
    if (now - lastClickTime.current < 300) {
      e.preventDefault();
      return;
    }
    lastClickTime.current = now;

    if (onClick) {
      onClick(e);
    }
  };

  const handleTouchStart = (e) => {
    // Prevent ghost clicks
    if (buttonRef.current) {
      buttonRef.current.style.touchAction = 'manipulation';
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`animated-btn ${buttonVariants[variant]} ${sizeVariants[size]} ${className}`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{ touchAction: 'manipulation' }}
      {...props}
    >
      <span className="btn-text">{children}</span>
      <span className="btn-bg"></span>
    </motion.button>
  );
};

export default AnimatedButton;
