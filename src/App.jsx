import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import GrainOverlay from './components/GrainOverlay';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMetrics from './components/AboutMetrics';
import Showcase from './components/Showcase';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import FloatingControlDock from './components/FloatingControlDock';
import VelocitySkew from './components/VelocitySkew';
import { playTactileClick } from './utils/audio';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { theme, isDark } = useTheme();

  // Initialize Lenis smooth momentum scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Global keyboard shortcut for Command Palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-sand text-ink selection:bg-terracotta selection:text-sand font-sans">
      {/* Viewport-wide SVG Procedural Noise (0.035 opacity) */}
      <GrainOverlay />

      {/* Initial Minimalist 00-100 Preloader */}
      <Preloader onComplete={() => setPreloaderFinished(true)} />

      {/* Floating Minimalist Navbar with Dark/Light Mode, Centered K Monogram & Audio Toggle */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Main Content Flow - Velocity Skew isolated */}
      <main className="relative z-10 flex flex-col">
        <VelocitySkew>
          <Hero />
          <AboutMetrics />
        </VelocitySkew>
        
        {/* Showcase with spacious, non-overlapping luxury project cards */}
        <Showcase />
        
        <VelocitySkew>
          <Guestbook />
        </VelocitySkew>
      </main>

      {/* Persistent Ergonomic Floating System Controls (Bottom-Right) */}
      <FloatingControlDock onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Editorial Colophon Footer */}
      <Footer />
    </div>
  );
}
