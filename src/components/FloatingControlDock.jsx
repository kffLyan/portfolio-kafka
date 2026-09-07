import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Volume2, VolumeX, Command, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { toggleAudioMuted, getAudioMuted, subscribeAudioState, playTactileClick } from '../utils/audio';

/**
 * FloatingControlDock
 * Ergonomic floating system control capsule positioned at bottom-right.
 * Accessible from anywhere on the page without scrolling back to top.
 */
export default function FloatingControlDock({ onOpenCommandPalette }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const [isAudioMuted, setIsAudioMuted] = useState(getAudioMuted());
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const unsubAudio = subscribeAudioState((muted) => setIsAudioMuted(muted));

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsubAudio();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleAudioToggle = () => {
    playTactileClick('soft');
    toggleAudioMuted();
  };

  const scrollToTop = () => {
    playTactileClick('soft');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside 
      aria-label="System controls"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-auto"
    >
      {/* Primary Control Capsule */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-bone/90 backdrop-blur-md border border-linen shadow-[0_8px_32px_rgba(26,36,33,0.12)] transition-colors duration-300">
        {/* Dark / Light Mode Toggle */}
        <button
          onClick={handleThemeToggle}
          className="group relative flex items-center gap-1.5 px-3 py-2 rounded-full bg-sand border border-linen/80 text-ink hover:border-terracotta transition-all duration-200 cursor-pointer"
          title={isDark ? "Switch to Light Mode (Warm Sand)" : "Switch to Dark Mode (Basalt Slate)"}
        >
          <motion.div
            key={isDark ? 'sun' : 'moon'}
            initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-stone group-hover:text-ink" />
            )}
          </motion.div>
          <span className="text-[11px] font-mono font-medium tracking-wide">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>

        {/* Tactile Audio Mute Toggle */}
        <button
          onClick={handleAudioToggle}
          className="p-2 rounded-full bg-sand border border-linen/80 text-stone hover:text-ink hover:border-terracotta transition-colors cursor-pointer"
          title={isAudioMuted ? "Unmute tactile audio clicks" : "Mute tactile audio clicks"}
          aria-label="Toggle sound"
        >
          {isAudioMuted ? (
            <VolumeX className="w-4 h-4 text-stone/60" />
          ) : (
            <Volume2 className="w-4 h-4 text-terracotta" />
          )}
        </button>

        {/* ⌘K Command Palette Trigger */}
        <button
          onClick={() => {
            playTactileClick('soft');
            onOpenCommandPalette?.();
          }}
          className="hidden sm:flex items-center gap-1 px-2.5 py-2 rounded-full bg-sand border border-linen/80 text-[11px] font-mono text-stone hover:text-ink hover:border-terracotta transition-colors cursor-pointer"
          title="Open Command Palette (⌘K / Ctrl+K)"
        >
          <Command className="w-3.5 h-3.5" />
          <span>K</span>
        </button>
      </div>

      {/* Scroll to Top Button (Smooth fade-in) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="p-3 rounded-full bg-ink text-sand border border-linen/40 shadow-[0_8px_32px_rgba(26,36,33,0.16)] hover:bg-terracotta transition-colors cursor-pointer"
            title="Scroll back to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  );
}
