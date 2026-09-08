import React from 'react';
import { motion } from 'framer-motion';
import { playTactileClick } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import useTiltSheen from '../hooks/useTiltSheen';

/**
 * EditorialPortrait
 * Physical exhibition mat-board frame for Muhammad Kafka Lyandra Pratama.
 * Features 3:4 portrait ratio, grayscale-to-color darkroom hover transition,
 * terracotta corner notch, monospace caption, 3D parallax tilt, and
 * dynamic specular sheen that follows cursor.
 */
export default function EditorialPortrait() {
  const { isDark } = useTheme();
  const {
    cardRef,
    tiltStyle,
    cardStyle,
    sheenStyle,
    sheenStyleDark,
    onMouseMove,
    onMouseLeave,
    isTouch,
  } = useTiltSheen({ maxTilt: 6, perspective: 1000 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] mx-auto lg:ml-auto"
      style={tiltStyle}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={() => playTactileClick('soft')}
        style={cardStyle}
        className="group relative rounded-2xl bg-bone border border-linen p-2 sm:p-2.5 shadow-[0_18px_50px_rgba(26,36,33,0.07)] transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(200,90,50,0.12)] cursor-pointer"
        data-cursor="project"
      >
        {/* Specular Light Sheen Overlay */}
        <div
          style={isDark ? sheenStyleDark : sheenStyle}
          className="rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />

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
