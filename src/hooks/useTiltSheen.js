import { useRef, useState, useEffect, useMemo } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * useTiltSheen
 * Reusable hook for 3D gyroscopic tilt + dynamic specular sheen.
 * Returns rotateX/Y springs (±6°), sheen gradient position, and event handlers.
 * Auto-disabled on touch devices and narrow viewports.
 */
export default function useTiltSheen({
  maxTilt = 6,
  perspective = 1000,
  springConfig = { stiffness: 280, damping: 24 },
} = {}) {
  const cardRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
        window.innerWidth < 1024
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]),
    springConfig
  );

  const onMouseMove = (e) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setSheenPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setSheenPos({ x: 50, y: 50 });
  };

  const tiltStyle = useMemo(() => ({
    perspective,
  }), [perspective]);

  const cardStyle = isTouch
    ? { transformStyle: 'preserve-3d' }
    : {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      };

  const sheenStyle = {
    background: `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(255,255,255,0.12), transparent 60%)`,
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderRadius: 'inherit',
    zIndex: 5,
    transition: 'background 0.15s ease',
  };

  const sheenStyleDark = {
    ...sheenStyle,
    background: `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(255,255,255,0.06), transparent 60%)`,
  };

  return {
    cardRef,
    tiltStyle,
    cardStyle,
    sheenStyle,
    sheenStyleDark,
    sheenPos,
    onMouseMove,
    onMouseLeave,
    isTouch,
  };
}
