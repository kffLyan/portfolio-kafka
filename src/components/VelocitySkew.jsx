import React, { useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

/**
 * VelocitySkew
 * Computes global scroll velocity and applies an editorial skew (-2deg to 2deg)
 * with spring physics, returning smoothly to 0deg on scroll pause.
 * Gracefully disabled on touch devices.
 */
export default function VelocitySkew({ children, className = '' }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Map high scroll velocity to subtle -2 to 2 degrees skew
  const skewRaw = useTransform(scrollVelocity, [-2500, 2500], [-2, 2]);
  const smoothSkew = useSpring(skewRaw, {
    stiffness: 350,
    damping: 30,
    mass: 0.1,
  });

  if (isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      style={{ skewY: smoothSkew }}
      className={`will-change-transform origin-center ${className}`}
    >
      {children}
    </motion.div>
  );
}
