import React from 'react';
import { motion } from 'framer-motion';

/**
 * AudioWaveform
 * 4-bar minimalist equalizer that pulses when unmuted
 * and collapses to flat lines when muted.
 * Inline SVG rendering (16×12px).
 */
export default function AudioWaveform({ isMuted = false, className = '' }) {
  const bars = [
    { delay: 0, heights: [3, 8, 4, 10, 3] },
    { delay: 0.15, heights: [8, 3, 10, 5, 8] },
    { delay: 0.3, heights: [5, 10, 3, 8, 5] },
    { delay: 0.1, heights: [10, 5, 8, 3, 10] },
  ];

  return (
    <svg
      viewBox="0 0 16 12"
      className={`w-4 h-3 ${className}`}
      aria-hidden="true"
    >
      {bars.map((bar, i) => (
        <motion.rect
          key={i}
          x={i * 4 + 0.5}
          width="2.5"
          rx="1"
          fill="currentColor"
          animate={
            isMuted
              ? { y: 5, height: 2 }
              : {
                  y: bar.heights.map((h) => 12 - h),
                  height: bar.heights,
                }
          }
          transition={
            isMuted
              ? { type: 'spring', stiffness: 400, damping: 25 }
              : {
                  y: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 1.2,
                    delay: bar.delay,
                    ease: 'easeInOut',
                  },
                  height: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 1.2,
                    delay: bar.delay,
                    ease: 'easeInOut',
                  },
                }
          }
        />
      ))}
    </svg>
  );
}
