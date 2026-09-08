import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Copy, ArrowUpRight, MessageSquareQuote, Database, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  getGuestbookEntries, 
  addGuestbookEntry, 
  subscribeToGuestbookUpdates, 
  getDatabaseStatus 
} from '../services/guestbookService';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

/**
 * Guestbook & Contact Section
 * Tailored for Muhammad Kafka Lyandra Pratama
 * Connected to Supabase Cloud Database with real-time synchronization.
 */
export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dbStatus = getDatabaseStatus();

  // Load entries from database & initialize real-time subscription
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getGuestbookEntries();
        if (isMounted) {
          setEntries(data);
        }
      } catch (err) {
        console.warn('Failed to load guestbook:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    // Subscribe to new incoming real-time entries and deletions
    const unsubscribe = subscribeToGuestbookUpdates(
      (newEntry) => {
        setEntries((prev) => {
          // Prevent duplicate entries if optimistic insert was already added
          if (prev.some((e) => e.id === newEntry.id)) return prev;
          return [newEntry, ...prev];
        });
      },
      (deletedId) => {
        setEntries((prev) => prev.filter((e) => e.id !== deletedId));
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    try {
      const addedEntry = await addGuestbookEntry({
        name: name.trim(),
        role: role.trim() || 'Visitor / Collaborator',
        message: message.trim(),
      });

      // Optimistically update or prepend if not already in list
      setEntries((prev) => {
        if (prev.some((entry) => entry.id === addedEntry.id)) return prev;
        return [addedEntry, ...prev];
      });

      // Micro-celebration
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.85 },
        colors: ['#C85A32', '#1A2421', '#E3DEC3'],
        ticks: 120,
        gravity: 1.2,
        scalar: 0.9,
      });

      setName('');
      setMessage('');
      setRole('');
    } catch (err) {
      console.error('Error submitting guestbook entry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { label: 'GitHub (kffLyan)', href: PERSONAL_INFO.github },
    { label: 'LinkedIn', href: PERSONAL_INFO.linkedin },
    { label: `Instagram (${PERSONAL_INFO.instagramHandle})`, href: PERSONAL_INFO.instagram },
  ];

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Baru saja';
    }
  };

  return (
    <section id="guestbook" className="py-24 sm:py-32 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto">
      {/* Editorial Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-stone mb-10">
        <span>03 // CORRESPONDENCE & GUESTBOOK</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Direct Contact & Socials */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl text-ink font-normal tracking-tight mb-6">
              Connect & Collaborate.
            </h2>
            <p className="text-stone text-sm sm:text-base leading-relaxed mb-8">
              Terbuka untuk diskusi proyek backend, tawaran magang / prakerin industri, kerja sama open source, atau konsultasi arsitektur sistem sekolah.
            </p>

            {/* Direct Email with Copy Interaction */}
            <div className="mb-6 p-5 rounded-2xl bg-bone border border-linen flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone block mb-1">
                  EMAIL TRANSMISSION
                </span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-mono text-ink font-medium hover:text-terracotta transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sand border border-linen text-xs font-mono text-ink hover:border-terracotta/70 transition-all cursor-pointer self-start sm:self-auto"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-emerald-800 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Instagram Channel */}
            <div className="mb-10 p-5 rounded-2xl bg-bone border border-linen flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sand border border-linen flex items-center justify-center text-terracotta shrink-0">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone block mb-0.5">
                    INSTAGRAM DISPATCH
                  </span>
                  <a
                    href={PERSONAL_INFO.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base sm:text-lg font-mono text-ink font-medium hover:text-terracotta transition-colors"
                  >
                    {PERSONAL_INFO.instagramHandle}
                  </a>
                </div>
              </div>

              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sand border border-linen text-xs font-mono text-ink hover:border-terracotta/70 transition-all cursor-pointer self-start sm:self-auto"
              >
                <span>Follow & DM</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-terracotta" />
              </a>
            </div>

            {/* Socials with Animated Underline Slide */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-stone">
                DIGITAL FOOTPRINT
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex items-center gap-1.5 text-sm font-mono text-ink/90 hover:text-terracotta transition-colors py-1"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-stone group-hover:text-terracotta" />
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-terracotta transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-10 mt-10 border-t border-linen text-xs font-mono text-stone hidden lg:block">
            <span>DOMISILI // {PERSONAL_INFO.location} &bull; {PERSONAL_INFO.school}</span>
          </div>
        </div>

        {/* Right Column: Live Cloud Guestbook Form & Stream */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="p-6 sm:p-8 rounded-3xl bg-bone/70 border border-linen/90 mb-10 shadow-[0_4px_24px_rgba(26,36,33,0.02)]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink font-semibold">
                <MessageSquareQuote className="w-4 h-4 text-terracotta" />
                <span>Buku Tamu Publik (Cloud Database)</span>
              </div>

              {/* Real-Time Database Connection Badge */}
              {dbStatus.isConfigured ? (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Supabase Live Connected</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bone border border-linen text-stone text-[11px] font-mono" title="Konfigurasi Supabase ada di .env dan docs/guestbook-setup.sql">
                  <Database className="w-3 h-3 text-terracotta" />
                  <span>Cloud DB Ready</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guestbook-name" className="block text-xs font-mono uppercase text-stone mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    id="guestbook-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bpk. Ahmad / Kak Rifqi"
                    className="w-full px-4 py-2.5 rounded-xl bg-sand border border-linen text-sm text-ink placeholder:text-stone/60 focus:outline-none focus:border-terracotta transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="guestbook-role" className="block text-xs font-mono uppercase text-stone mb-1.5">
                    Instansi / Posisi
                  </label>
                  <input
                    id="guestbook-role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Guru Pembimbing / Tech Lead"
                    className="w-full px-4 py-2.5 rounded-xl bg-sand border border-linen text-sm text-ink placeholder:text-stone/60 focus:outline-none focus:border-terracotta transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="guestbook-msg" className="block text-xs font-mono uppercase text-stone mb-1.5">
                  Pesan / Catatan Evaluasi *
                </label>
                <textarea
                  id="guestbook-msg"
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis pesan, catatan evaluasi, atau feedback teknis yang dapat dibaca pengunjung lain..."
                  className="w-full px-4 py-2.5 rounded-xl bg-sand border border-linen text-sm text-ink placeholder:text-stone/60 focus:outline-none focus:border-terracotta transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-[11px] font-mono text-stone">
                  {dbStatus.isConfigured 
                    ? 'Pesan tersimpan di cloud database & tersinkronisasi live' 
                    : 'Pesan tersimpan otomatis & siap disinkronkan ke Supabase'}
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ink text-sand text-xs font-mono uppercase tracking-wider hover:bg-terracotta transition-colors duration-200 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Pesan</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Guestbook Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-stone">
                CATATAN MASUK ({entries.length})
              </span>
              {isLoading && (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-stone">
                  <Loader2 className="w-3 h-3 animate-spin text-terracotta" />
                  <span>Sinkronisasi...</span>
                </span>
              )}
            </div>

            <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: -20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className="p-5 rounded-2xl bg-bone/40 border border-linen/80 hover:border-linen transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4 mb-2 text-xs font-mono">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-ink">{entry.name}</span>
                        <span className="text-stone/70">&bull;</span>
                        <span className="text-stone">{entry.role}</span>
                      </div>
                      <span className="text-[11px] text-stone/80 tabular-nums shrink-0">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-ink/90 font-serif leading-relaxed">
                      "{entry.message}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {entries.length === 0 && !isLoading && (
                <div className="p-8 rounded-2xl bg-bone/30 border border-dashed border-linen text-center">
                  <p className="text-sm font-mono text-stone mb-1">Belum ada catatan masuk.</p>
                  <p className="text-xs text-stone/70">Jadilah yang pertama menulis pesan atau feedback di atas!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
