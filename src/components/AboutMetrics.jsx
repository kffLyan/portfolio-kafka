import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { GraduationCap, User, Award, ShieldCheck, Code2, MapPin, Briefcase } from 'lucide-react';
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
 * Dedicated "Siapa Saya" (About Me) Profile dossier,
 * editorial manifesto with word-by-word scroll unmasking,
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

  const p = PERSONAL_INFO.profileDetails || {};

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-24 sm:py-32 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto"
    >
      {/* Editorial Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-stone mb-8">
        <span>01 // PROFIL & TENTANG SAYA</span>
      </div>

      {/* DEDICATED WHO AM I (SIAPA SAYA) PROFILE CARD */}
      <div className="p-7 sm:p-10 rounded-3xl bg-bone/70 border border-linen/90 mb-16 shadow-[0_4px_24px_rgba(26,36,33,0.03)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Big Greeting & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand border border-linen text-xs font-mono text-terracotta">
              <User className="w-3.5 h-3.5" />
              <span>SIAPA SAYA</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-snug">
              Muhammad Kafka <br />
              <span className="italic text-stone">Lyandra Pratama</span>
            </h2>

            <p className="text-sm text-stone leading-relaxed">
              Halo! Saya akrab dipanggil <strong>Kafka</strong>. Saya adalah siswa kelas XII di <strong>SMK Budi Bakti Ciwidey</strong> jurusan Rekayasa Perangkat Lunak (PPLG / RPL) dengan minat dan dedikasi mendalam pada <strong>Backend Engineering</strong> dan arsitektur sistem perangkat lunak.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sand border border-linen text-xs font-mono text-ink">
                <MapPin className="w-3 h-3 text-terracotta" />
                Ciwidey, Kab. Bandung
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sand border border-linen text-xs font-mono text-ink">
                <Briefcase className="w-3 h-3 text-terracotta" />
                Siap Magang / Prakerin
              </span>
            </div>
          </div>

          {/* Right Column: Structured Quick Dossier */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Box 1: Pendidikan */}
            <div className="p-4 rounded-2xl bg-sand/80 border border-linen flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-terracotta uppercase mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Pendidikan & Sekolah</span>
              </div>
              <div>
                <h4 className="font-sans font-semibold text-sm text-ink mb-1">{p.school || PERSONAL_INFO.school}</h4>
                <p className="text-xs text-stone">{p.major || PERSONAL_INFO.major}</p>
                <span className="inline-block mt-2 text-[11px] font-mono text-stone/80 bg-bone px-2 py-0.5 rounded border border-linen">
                  {p.classGrade || PERSONAL_INFO.gradYear}
                </span>
              </div>
            </div>

            {/* Box 2: Kepemimpinan Organisasi */}
            <div className="p-4 rounded-2xl bg-sand/80 border border-linen flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-terracotta uppercase mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Peran & Kepemimpinan</span>
              </div>
              <ul className="space-y-1.5 text-xs text-ink/90 font-sans">
                {(p.roles || [PERSONAL_INFO.leadership]).map((role, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-terracotta font-mono">&bull;</span>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 3: Spesialisasi Teknis */}
            <div className="p-4 rounded-2xl bg-sand/80 border border-linen flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-terracotta uppercase mb-2">
                <Code2 className="w-4 h-4" />
                <span>Fokus Keahlian</span>
              </div>
              <p className="text-xs text-stone leading-relaxed mb-2">
                {p.focus || "Backend Architecture, RESTful API, Database Design, RBAC & Security"}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Laravel", "Next.js", "PostgreSQL", "Prisma", "MySQL"].map((tech) => (
                  <span key={tech} className="text-[10px] font-mono bg-bone px-2 py-0.5 rounded text-ink border border-linen">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Box 4: Prestasi Kunci */}
            <div className="p-4 rounded-2xl bg-sand/80 border border-linen flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-terracotta uppercase mb-2">
                <Award className="w-4 h-4" />
                <span>Prestasi & Pengalaman</span>
              </div>
              <ul className="space-y-1.5 text-xs text-ink/90 font-sans">
                {(p.achievements || [
                  "Juara 2 LKS Pemrograman C++",
                  "Programmer IoT Teaching Factory",
                  "Sole Backend SI REMED v2"
                ]).map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-terracotta font-mono font-bold">&check;</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Manifesto Statement with Word-by-Word Scroll Unmask */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
        <div className="lg:col-span-4">
          <h3 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-snug">
            Server-side rigor <br className="hidden sm:inline" />
            <span className="italic text-stone">over cosmetic facade.</span>
          </h3>
          <p className="mt-4 text-xs font-mono text-stone uppercase tracking-wider">
            FILOSOFI REKAYASA & KUALITAS SISTEM
          </p>
        </div>

        <div className="lg:col-span-8">
          {/* Scroll-scrubbed word-by-word unmasking */}
          <ManifestoParagraph text={PERSONAL_INFO.philosophy} />

          <p className="text-sm sm:text-base text-stone leading-relaxed max-w-2xl mb-4">
            Saat ini sedang mempersiapkan pelaksanaan <strong>Praktik Kerja Industri (Prakerin)</strong> dan sertifikasi kompetensi kejuruan. Fokus rekayasa saya berpusat pada penguasaan ekosistem <strong>Laravel (PHP)</strong> dan ekspansi ke arsitektur fullstack modern menggunakan <strong>Next.js 16</strong>, <strong>PostgreSQL</strong>, dan <strong>Prisma ORM</strong>.
          </p>
          <p className="text-sm text-stone leading-relaxed max-w-2xl">
            Di luar baris kode, tanggung jawab sebagai <strong>Ketua Kelas XII RPL</strong> dan <strong>Wakil Ketua Komisi D MPK</strong> membentuk kemampuan komunikasi, manajemen tim teknis, serta koordinasi musyawarah antara guru, siswa, dan mitra kerja.
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
