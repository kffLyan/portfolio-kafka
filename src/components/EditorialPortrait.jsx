import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { playTactileClick } from '../utils/audio';

/**
 * EditorialPortrait
 * Physical exhibition mat-board frame for Muhammad Kafka Lyandra Pratama.
 * Features 3:4 portrait ratio, grayscale-to-color darkroom hover transition,
 * terracotta corner notch, monospace caption, and subtle 3D parallax tilt.
 */
export default function EditorialPortrait() {
  const cardRef = useRef(null);
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 280,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 280,
    damping: 24,
  });

  const handleMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] mx-auto lg:ml-auto"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => playTactileClick('soft')}
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative rounded-2xl bg-bone border border-linen p-2 sm:p-2.5 shadow-[0_18px_50px_rgba(26,36,33,0.07)] transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(200,90,50,0.12)] cursor-pointer"
      >
        {/* Hairline Decorative Corner Notch (Burnt Terracotta) */}
        <div 
          className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-r-2 border-b-2 border-terracotta z-20 pointer-events-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" 
          aria-hidden="true"
        />

        {/* Inner Exhibition Mat Frame with Strict 3:4 Aspect Ratio */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-ink/5">
          {/* Official Portrait Photo */}
          <img
            src="/images/kafka-portrait.png"
            alt="Muhammad Kafka Lyandra Pratama — Official Editorial Portrait"
            className="w-full h-full object-cover object-top filter grayscale contrast-[108%] brightness-[96%] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            loading="eager"
          />

          {/* Analog Texture Overlay to Kill Digital Flatness */}
          <div 
            className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"
            aria-hidden="true"
          />

          {/* Ambient Lighting Gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Monospace Typographic Caption directly beneath Photo */}
        <div className="pt-2.5 pb-0.5 px-1.5 flex items-center justify-between text-[10px] font-mono tracking-widest text-stone uppercase">
          <span className="flex items-center gap-1.5 font-medium text-ink/80 group-hover:text-terracotta transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta group-hover:animate-ping" />
            FIG. 01 — ARCHITECT
          </span>
          <span className="text-stone/80 tabular-nums">
            KAFKA // 2026
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
