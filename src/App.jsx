import React, { useEffect, useState } from 'react';
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
import KineticMarquee from './components/KineticMarquee';
import CustomCursor, { CursorProvider } from './components/CustomCursor';

export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  const handleOpenPalette = React.useCallback(() => {
    setIsCommandPaletteOpen(true);
  }, []);

  const handleClosePalette = React.useCallback(() => {
    setIsCommandPaletteOpen(false);
  }, []);

  // Global keyboard shortcut for Command Palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (e.repeat) return;
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Memoize heavy page contents so opening/closing Command Palette does not trigger tree re-renders
  const mainContent = React.useMemo(
    () => (
      <main className="relative z-10 flex flex-col">
        <VelocitySkew>
          <Hero />
        </VelocitySkew>

        {/* Kinetic Marquee Strip — Editorial Divider */}
        <KineticMarquee />

        <VelocitySkew>
          <AboutMetrics />
        </VelocitySkew>

        {/* Showcase with spacious, non-overlapping luxury project cards */}
        <Showcase />

        <VelocitySkew>
          <Guestbook />
        </VelocitySkew>
      </main>
    ),
    []
  );

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-sand text-ink selection:bg-terracotta selection:text-sand font-sans">
        {/* Bespoke Editorial Cursor (desktop only) */}
        <CustomCursor />

        {/* Viewport-wide SVG Procedural Noise (0.035 opacity) */}
        <GrainOverlay />

        {/* Initial Minimalist 00-100 Preloader */}
        <Preloader onComplete={() => setPreloaderFinished(true)} />

        {/* Floating Minimalist Navbar */}
        <Navbar onOpenCommandPalette={handleOpenPalette} />

        {/* Command Palette (⌘K / Ctrl+K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={handleClosePalette}
        />

        {/* Main Content Flow */}
        {mainContent}

        {/* Persistent Ergonomic Floating System Controls (Bottom-Right) */}
        <FloatingControlDock onOpenCommandPalette={handleOpenPalette} />

        {/* Editorial Colophon Footer */}
        <Footer />
      </div>
    </CursorProvider>
  );
}
