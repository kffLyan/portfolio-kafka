import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ShieldCheck } from 'lucide-react';
import MagneticButton from './MagneticButton';
import EditorialPortrait from './EditorialPortrait';
import { PERSONAL_INFO } from '../data/portfolioData';

/**
 * Hero Section
 * Asymmetric 2-column editorial grid:
 * - Left Column (7 cols): Availability badge, massive Newsreader headline, ethos & magnetic CTA.
 * - Right Column (5 cols): Editorial portrait frame with darkroom hover physics.
 * Stacks gracefully on mobile viewports.
 */
export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const lineVariants = {
    hidden: { y: '110%', rotate: 1.5 },
    visible: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
    },
  };

  return (
    <section 
      id="top" 
      className="relative min-h-[92vh] flex flex-col justify-center pt-32 sm:pt-40 pb-16 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto"
    >
      <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
        {/* Left Column (7 Cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-center mb-12 lg:mb-0">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 w-fit mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-bone border border-linen text-xs font-mono tracking-wide text-ink/90">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta"></span>
              </span>
              <span className="uppercase text-[11px] font-medium tracking-wider">{PERSONAL_INFO.status}</span>
            </div>

            <span className="hidden sm:inline text-xs font-mono text-stone">
              {PERSONAL_INFO.school} &bull; {PERSONAL_INFO.location}
            </span>
          </motion.div>

          {/* Massive Editorial Headline with Mask Reveals */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            {PERSONAL_INFO.heroHeadline.map((line, idx) => (
              <div key={idx} className="overflow-hidden py-0.5">
                <motion.h1
                  variants={lineVariants}
                  className={`font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[4.8rem] xl:text-[5.4rem] tracking-tight text-ink font-normal leading-[1.05] ${
                    idx === 1 ? 'italic font-light text-ink/90 pl-1 sm:pl-4' : ''
                  }`}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </motion.div>

          {/* Subheadline, Academic Role & Ethos */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-4 max-w-2xl mb-8"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-ink font-medium">
              <ShieldCheck className="w-4 h-4 text-terracotta shrink-0" />
              <span>Backend Architecture & Multi-Role RBAC &bull; {PERSONAL_INFO.leadership}</span>
            </div>

            <p className="text-sm sm:text-base text-stone leading-relaxed font-sans">
              {PERSONAL_INFO.heroBio}
            </p>
          </motion.div>

          {/* Magnetic CTA Button */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              as="a"
              href="#works"
              radius={50}
              strength={0.3}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-ink text-sand text-xs font-mono uppercase tracking-wider hover:bg-terracotta transition-colors duration-300 shadow-[0_4px_20px_rgba(26,36,33,0.12)] cursor-pointer"
            >
              <span>Explore Repos & Systems</span>
              <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </MagneticButton>

            <a
              href="#about"
              className="text-xs font-mono uppercase tracking-wider text-stone hover:text-ink transition-colors px-3 py-2"
            >
              Read Philosophy &rarr;
            </a>
          </motion.div>
        </div>

        {/* Right Column (5 Cols on desktop, centered stack on mobile) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <EditorialPortrait />
        </div>
      </div>
    </section>
  );
}
