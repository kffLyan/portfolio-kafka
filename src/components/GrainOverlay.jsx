import React from 'react';

/**
 * GrainOverlay
 * Fixed viewport procedural monochrome SVG noise to eliminate digital plastic flatness.
 * Opacity: 0.035, pointer-events-none to ensure zero interaction interference.
 */
export default function GrainOverlay() {
  return (
    <div 
      className="noise-overlay" 
      aria-hidden="true"
    />
  );
}
