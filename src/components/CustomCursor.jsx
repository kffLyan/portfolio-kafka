import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * CursorContext
 * Allows any component to control cursor variant via data-cursor attributes
 * or programmatically via setCursorVariant.
 */
const CursorContext = createContext({
  cursorVariant: 'default',
  setCursorVariant: () => {},
});

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }) {
  const [cursorVariant, setCursorVariant] = useState('default');

  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant }}>
      {children}
    </CursorContext.Provider>
  );
}

/**
 * CustomCursor
 * Bespoke editorial cursor with Framer Motion springs.
 * - Default: 8px hairline circle + 3px pinpoint dot
 * - Hover project cards: morphs into [VIEW ARCHIVE ↗]
 * - Hover sandbox: [INTERACT]
 * - Hover copy: [COPY]
 * - Hover links: scaled ring
 * - Click: expanding ripple ring
 * Auto-disabled on touch/mobile via matchMedia.
 */
export default function CustomCursor() {
  const { cursorVariant, setCursorVariant } = useCursor();
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  });
  const [clicks, setClicks] = useState([]);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ultra-responsive outer ring spring: zero perceptible lag, smooth magnetic snap
  const springConfig = { damping: 55, stiffness: 2200, mass: 0.01 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Detect touch device
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Track mouse position synchronously with ZERO delay
  useEffect(() => {
    if (isTouch) return;

    const onMouseMove = (e) => {
      // Synchronous hardware-level tracking for pinpoint dot
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      let targetX = e.clientX;
      let targetY = e.clientY;

      // Hover Snapping (Magnetic Effect): magnetically pull toward center
      const targetEl = e.target;
      if (targetEl && targetEl.closest) {
        const interactive = targetEl.closest('button, a, [role="button"], [data-magnetic]');
        if (interactive && !interactive.closest('[data-cursor="project"]')) {
          const rect = interactive.getBoundingClientRect();
          if (rect.width <= 320 && rect.height <= 200) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const pullStrength = 0.22;
            targetX = e.clientX + (centerX - e.clientX) * pullStrength;
            targetY = e.clientY + (centerY - e.clientY) * pullStrength;
          }
        }
      }

      cursorX.set(targetX);
      cursorY.set(targetY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [isTouch, cursorX, cursorY, dotX, dotY]);

  // Click ripple effect
  useEffect(() => {
    if (isTouch) return;

    const onMouseDown = (e) => {
      const id = Date.now();
      setClicks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== id));
      }, 400);
    };

    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, [isTouch]);

  // Global data-cursor attribute detection via event delegation
  useEffect(() => {
    if (isTouch) return;

    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorVariant(target.getAttribute('data-cursor'));
      } else {
        // Check if hovering any interactive element
        const interactive = e.target.closest('a, button, [role="button"], input, textarea, select, label[for]');
        if (interactive) {
          setCursorVariant('link');
        } else {
          setCursorVariant('default');
        }
      }
    };

    document.addEventListener('mouseover', onMouseOver, { passive: true });
    return () => document.removeEventListener('mouseover', onMouseOver);
  }, [isTouch, setCursorVariant]);

  if (isTouch) return null;

  const isPill = cursorVariant === 'project' || cursorVariant === 'interact' || cursorVariant === 'copy';
  const isLink = cursorVariant === 'link';

  const pillText = {
    project: 'VIEW ARCHIVE ↗',
    interact: 'INTERACT',
    copy: 'COPY',
  };

  return (
    <>
      {/* Outer ring / pill */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      >
        <AnimatePresence mode="wait">
          {isPill ? (
            <motion.div
              key="pill"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex items-center justify-center px-4 py-1.5 rounded-full border border-white/80 bg-white/10 backdrop-blur-sm"
            >
              <span className="text-[10px] font-mono font-semibold tracking-wider text-white uppercase whitespace-nowrap">
                {pillText[cursorVariant]}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="ring"
              initial={false}
              animate={{
                width: isLink ? 48 : 8,
                height: isLink ? 48 : 8,
                borderWidth: isLink ? 1.5 : 1,
                opacity: 1,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="rounded-full border-white/90"
              style={{ borderStyle: 'solid' }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner pinpoint dot (only visible in default/link state) */}
      {!isPill && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
          style={{
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
            willChange: 'transform',
          }}
        >
          <motion.div
            animate={{
              width: isLink ? 4 : 3,
              height: isLink ? 4 : 3,
              opacity: isLink ? 0.6 : 1,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="rounded-full bg-white"
          />
        </motion.div>
      )}

      {/* Click ripple rings */}
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
            style={{
              left: click.x,
              top: click.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ width: 8, height: 8, opacity: 0.8 }}
            animate={{ width: 60, height: 60, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="w-full h-full rounded-full border border-white/60" />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
