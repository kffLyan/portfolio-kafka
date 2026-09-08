import React from 'react';
import { ArrowUp } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { PERSONAL_INFO } from '../data/portfolioData';

/**
 * Footer
 * Editorial colophon, minimal typography, and back to top button.
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-linen bg-sand py-16 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-linen/60">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-5 h-5 rounded-full bg-ink text-sand flex items-center justify-center font-serif text-[11px] font-semibold">
              {PERSONAL_INFO.monogram}
            </span>
            <span className="text-sm font-mono font-medium text-ink">
              {PERSONAL_INFO.name} ({PERSONAL_INFO.nickname})
            </span>
          </div>
          <p className="text-xs text-stone font-mono">
            {PERSONAL_INFO.school} &bull; {PERSONAL_INFO.major} &bull; {PERSONAL_INFO.location}
          </p>
        </div>

        {/* Back to Top Magnetic Button */}
        <MagneticButton
          as="button"
          onClick={scrollToTop}
          radius={40}
          strength={0.3}
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-bone border border-linen text-xs font-mono text-ink hover:border-terracotta transition-colors cursor-pointer"
        >
          <span>Back to Apex</span>
          <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 text-stone group-hover:text-terracotta" />
        </MagneticButton>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-stone">
        <p>
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All structural rights reserved.
        </p>
        <p className="flex items-center gap-3">
          <span>Engineered with React • Framer Motion • Tailwind CSS • Vite</span>
        </p>
      </div>
    </footer>
  );
}
