import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, METRICS } from '../data/portfolioData';

/**
 * WordUnmask
 * Smoothly unmasks text opacity on scroll while respecting the active theme
 */
function ScrollWord({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.35, 1]);

  return (
    <span className="relative inline-block mr-[0.28em] my-[0.08em]">
      <motion.span style={{ opacity }} className="text-ink transition-colors">
        {word}
      </motion.span>
    </span>
  );
}

function ManifestoParagraph({ text }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  const words = text.split(' ');
  const totalWords = words.length;

  return (
    <p ref={containerRef} className="text-xl sm:text-2xl md:text-3xl font-serif leading-[1.45] font-light mb-8">
      {words.map((word, i) => {
        const start = i / totalWords;
        const end = Math.min(1, start + 1.8 / totalWords);
        return (
          <ScrollWord
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

/**
 * MetricCounter
 * Smoothly counts up from 0 to value when entering viewport.
 */
function MetricCounter({ value, suffix }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          if (value % 1 !== 0) {
            setDisplayValue(latest.toFixed(1));
          } else {
            setDisplayValue(Math.round(latest));
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums font-mono">
      {displayValue}
      {suffix}
    </span>
  );
}

/**
 * AboutMetrics
 * Editorial manifesto with word-by-word scroll unmasking,
 * dynamic expanding hairline, and 3-card minimalist metric strip.
 */
export default function AboutMetrics() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Dynamic hairline expansion tied directly to scroll progress
  const hairlineScaleX = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-24 sm:py-32 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto"
    >
      {/* Editorial Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-stone mb-10">
        <span>01 // ARCHITECTURAL PHILOSOPHY & ACADEMICS</span>
      </div>

      {/* Editorial Manifesto Statement with Word-by-Word Scroll Unmask */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
        <div className="lg:col-span-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-snug">
            Server-side rigor <br className="hidden sm:inline" />
            <span className="italic text-stone">over cosmetic facade.</span>
          </h2>

          <div className="mt-6 p-4 rounded-xl bg-bone/70 border border-linen flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
            <div className="text-xs font-mono">
              <span className="font-semibold text-ink block">{PERSONAL_INFO.school}</span>
              <span className="text-stone block">{PERSONAL_INFO.major}</span>
              <span className="text-terracotta block mt-1">{PERSONAL_INFO.gradYear}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          {/* Scroll-scrubbed word-by-word unmasking */}
          <ManifestoParagraph text={PERSONAL_INFO.philosophy} />

          <p className="text-sm sm:text-base text-stone leading-relaxed max-w-2xl mb-4">
            Currently preparing for industry internship (Prakerin) and national vocational certification. My engineering focus centers on mastering the <strong>Laravel (PHP)</strong> ecosystem while scaling into modern fullstack architecture with <strong>Next.js 16</strong>, <strong>PostgreSQL</strong>, and <strong>Prisma ORM</strong>.
          </p>
          <p className="text-sm text-stone leading-relaxed max-w-2xl">
            Beyond coding, serving as <strong>Ketua Kelas XII RPL</strong> and <strong>Wakil Ketua Komisi D MPK</strong> has honed my ability to coordinate teams, lead architectural discussions, and bridge communication between teachers, students, and project stakeholders.
          </p>
        </div>
      </div>

      {/* Dynamic SVG Hairline Tied to Scroll Progress */}
      <div className="relative w-full h-[2px] bg-linen/40 mb-16 overflow-hidden">
        <motion.div
          style={{ scaleX: hairlineScaleX, transformOrigin: 'left' }}
          className="absolute inset-0 bg-terracotta h-full w-full"
        />
      </div>

      {/* 3-Card Minimalist Metric Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {METRICS.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="p-8 rounded-2xl bg-bone/70 border border-linen/80 flex flex-col justify-between group hover:border-terracotta/40 transition-colors duration-300"
          >
            <div className="text-4xl sm:text-5xl font-light text-ink mb-6 flex items-baseline gap-1 group-hover:text-terracotta transition-colors duration-300">
              <MetricCounter value={metric.value} suffix={metric.suffix} />
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-ink font-semibold mb-1">
                {metric.label}
              </h3>
              <p className="text-xs text-stone leading-relaxed">
                {metric.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
