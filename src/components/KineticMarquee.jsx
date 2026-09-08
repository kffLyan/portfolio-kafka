import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring, useMotionValue } from 'framer-motion';

const MARQUEE_ITEMS = [
  'BACKEND SYSTEMS',
  'ZERO-TRUST ARCHITECTURE',
  'NEXT.JS',
  'LARAVEL',
  'DISTRIBUTED SECURITY',
  'POSTGRESQL',
  'RBAC ENGINE',
  'API DESIGN',
  'PRISMA ORM',
  'TYPESCRIPT',
];

const SEPARATOR = ' • ';
const CONTENT = MARQUEE_ITEMS.join(SEPARATOR) + SEPARATOR;

/**
 * KineticMarquee
 * Dual-hairline editorial text strip with:
 * - Infinite smooth scroll
 * - Scroll-velocity acceleration
 * - Click-and-drag with momentum inertia
 * - GPU-accelerated via translate3d
 */
export default function KineticMarquee() {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragOffset = useRef(0);

  // Track page scroll velocity
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const velocityFactor = useTransform(scrollVelocity, [-1000, 0, 1000], [3, 1, 3]);
  const smoothVelocity = useSpring(velocityFactor, { stiffness: 100, damping: 30 });

  // Base animation offset for the ticker
  const baseX = useMotionValue(0);

  // Animate ticker with velocity awareness
  useEffect(() => {
    let animationFrame;
    let x = 0;
    const speed = 0.4; // px per frame base

    const tick = () => {
      if (!isDragging.current) {
        const currentVelocity = smoothVelocity.get();
        x -= speed * currentVelocity;

        // Reset position to create seamless infinite loop
        // Use the width of one repetition of the text
        if (Math.abs(x) > 2000) {
          x = x % 2000;
        }

        baseX.set(x);
      }
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [baseX, smoothVelocity]);

  // Pointer drag handlers
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragOffset.current = baseX.get();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    baseX.set(dragOffset.current + delta);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Repeat content enough to fill viewport
  const repeatedContent = CONTENT.repeat(6);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none border-y border-linen/70 py-5 my-0"
      style={{ cursor: 'grab', willChange: 'transform' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Row 1: Scrolls left */}
      <motion.div
        className="flex whitespace-nowrap"
        style={{
          x: baseX,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      >
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-stone/70 leading-none inline-block pr-4">
          {repeatedContent}
        </span>
      </motion.div>

      {/* Hairline separator */}
      <div className="w-full h-[1px] bg-linen/50 my-3" />

      {/* Row 2: Scrolls right (inverted) */}
      <motion.div
        className="flex whitespace-nowrap"
        style={{
          x: useTransform(baseX, (v) => -v),
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      >
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-stone/40 leading-none inline-block pr-4">
          {repeatedContent}
        </span>
      </motion.div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-sand to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-sand to-transparent pointer-events-none z-10" />
    </div>
  );
}
