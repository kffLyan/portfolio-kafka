import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton
 * Attracts smoothly toward pointer coordinates within a given radius,
 * snapping back to origin with spring physics.
 */
export default function MagneticButton({ 
  children, 
  className = '', 
  onClick, 
  radius = 60,
  strength = 0.35,
  as = 'button',
  ...props 
}) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < radius + rect.width / 2) {
      mouseX.set(distanceX * strength);
      mouseY.set(distanceY * strength);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Component = motion[as] || motion.button;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
