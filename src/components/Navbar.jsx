import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Command, Sun, Moon } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playTactileClick, toggleAudioMuted, getAudioMuted, subscribeAudioState } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

/**
 * Navbar
 * Floating pill-shaped container:
 * - Perfectly centered 'K' logo monogram & identity
 * - Synthetic audio mute toggle
 * - Tactile Framer Motion spring physics Dark/Light toggle
 * - ⌘K Command Palette trigger
 * - Smooth magnetic section anchors
 */
export default function Navbar({ activeSection = 'hero', onOpenCommandPalette }) {
  const [activeTab, setActiveTab] = useState(activeSection);
  const [isAudioMuted, setIsAudioMuted] = useState(getAudioMuted());
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    return subscribeAudioState((muted) => setIsAudioMuted(muted));
  }, []);

  // Update active state based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['works', 'about', 'guestbook'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(section);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveTab('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'works', label: 'Works', href: '#works' },
    { id: 'guestbook', label: 'Contact', href: '#guestbook' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    playTactileClick('soft');
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-5 inset-x-0 z-40 px-4 pointer-events-none flex justify-center">
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-4xl px-4 sm:px-6 py-2.5 rounded-full bg-sand/90 backdrop-blur-md border border-linen shadow-[0_4px_24px_rgba(26,36,33,0.04)] transition-all duration-300">
        {/* Left: Centered 'K' Logo & Identity */}
        <a 
          href="#top" 
          onClick={(e) => scrollToSection(e, '#top')}
          className="group flex items-center gap-2.5 text-xs font-mono tracking-wider text-ink uppercase"
        >
          <span className="w-7 h-7 rounded-full bg-ink text-sand flex items-center justify-center font-serif text-sm font-semibold leading-none text-center select-none group-hover:bg-terracotta transition-colors duration-300">
            K
          </span>
          <span className="inline-block font-semibold tracking-normal text-ink">
            {PERSONAL_INFO.nickname.toUpperCase()} LYANDRA
          </span>
        </a>

        {/* Right: Navigation Links + Sleek Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Nav Items */}
          <div className="flex items-center gap-0.5 sm:gap-1 mr-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <MagneticButton
                  key={item.id}
                  as="a"
                  href={item.href}
                  radius={30}
                  strength={0.25}
                  onClick={(e) => {
                    scrollToSection(e, item.href);
                    setActiveTab(item.id);
                  }}
                  className={`relative px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                    isActive ? 'text-ink font-semibold' : 'text-stone hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-bone border border-linen/80 -z-10"
                      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    />
                  )}
                  {item.label}
                </MagneticButton>
              );
            })}
          </div>

          <div className="hidden sm:block w-[1px] h-4 bg-linen/80" />

          {/* Audio Haptic Toggle */}
          <button
            onClick={() => toggleAudioMuted()}
            className="p-1.5 rounded-full bg-bone border border-linen text-stone hover:text-terracotta transition-colors cursor-pointer"
            title={isAudioMuted ? 'Unmute tactile clicks' : 'Mute tactile clicks'}
            aria-label="Toggle sound"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-stone/60" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Tactile Pill Theme Switcher with Spring Physics */}
          <button
            onClick={toggleTheme}
            className="relative w-11 h-6 p-0.5 rounded-full bg-bone border border-linen flex items-center cursor-pointer transition-colors duration-300"
            title={isDark ? 'Switch to Light Mode (Daylight Sand)' : 'Switch to Dark Mode (Obsidian Pine)'}
            aria-label="Toggle theme"
          >
            <motion.div
              className="w-4.5 h-4.5 rounded-full bg-ink text-sand flex items-center justify-center shadow-sm"
              animate={{ x: isDark ? 20 : 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            >
              {isDark ? (
                <Moon className="w-2.5 h-2.5 text-sand" />
              ) : (
                <Sun className="w-2.5 h-2.5 text-sand" />
              )}
            </motion.div>
          </button>

          {/* ⌘K Command Palette Button */}
          <button
            onClick={() => {
              playTactileClick('soft');
              onOpenCommandPalette?.();
            }}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-bone border border-linen text-[11px] font-mono text-stone hover:text-ink hover:border-terracotta transition-colors cursor-pointer"
            title="Open command palette (⌘K / Ctrl+K)"
          >
            <Command className="w-3 h-3" />
            <span>K</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
