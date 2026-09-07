import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Copy, Check, Volume2, VolumeX, FileText, Sparkles, X } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4 text-terracotta" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4 text-stone" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4 text-stone" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import { PERSONAL_INFO } from '../data/portfolioData';
import { playTactileClick, toggleAudioMuted, getAudioMuted, subscribeAudioState } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(getAudioMuted());
  const { theme, isDark, toggleTheme } = useTheme();
  const inputRef = useRef(null);

  useEffect(() => {
    return subscribeAudioState((muted) => setIsAudioMuted(muted));
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
      playTactileClick('soft');
    }
  }, [isOpen]);

  const actions = [
    {
      id: 'works',
      title: 'Jump to Selected Works & Sandbox',
      category: 'Navigation',
      icon: <ArrowRight className="w-4 h-4 text-terracotta" />,
      run: () => {
        document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'about',
      title: 'Jump to Philosophy & Academics',
      category: 'Navigation',
      icon: <ArrowRight className="w-4 h-4 text-stone" />,
      run: () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'guestbook',
      title: 'Jump to Guestbook & Correspondence',
      category: 'Navigation',
      icon: <ArrowRight className="w-4 h-4 text-stone" />,
      run: () => {
        document.querySelector('#guestbook')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'email',
      title: copiedEmail ? 'Email Copied!' : 'Copy Direct Email (kafkalyandra@gmail.com)',
      category: 'Action',
      icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4 text-terracotta" />,
      run: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        setCopiedEmail(true);
        playTactileClick('success');
        setTimeout(() => {
          setCopiedEmail(false);
          onClose();
        }, 1200);
      },
    },
    {
      id: 'instagram',
      title: `Open Instagram Profile (${PERSONAL_INFO.instagramHandle})`,
      category: 'Social',
      icon: <InstagramIcon className="w-4 h-4 text-terracotta" />,
      run: () => {
        window.open(PERSONAL_INFO.instagram, '_blank');
        onClose();
      },
    },
    {
      id: 'theme',
      title: isDark ? 'Switch to Light Mode (Active: Obsidian Pine)' : 'Switch to Dark Mode (Active: Daylight Sand)',
      category: 'Theme',
      icon: <Sparkles className="w-4 h-4 text-terracotta" />,
      run: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'github',
      title: 'Open GitHub Profile (kffLyan)',
      category: 'Social',
      icon: <GithubIcon className="w-4 h-4 text-stone" />,
      run: () => {
        window.open(PERSONAL_INFO.github, '_blank');
        onClose();
      },
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn Profile',
      category: 'Social',
      icon: <LinkedinIcon className="w-4 h-4 text-stone" />,
      run: () => {
        window.open(PERSONAL_INFO.linkedin, '_blank');
        onClose();
      },
    },
    {
      id: 'audio',
      title: isAudioMuted ? 'Enable Tactile Micro-Audio Clicks' : 'Mute Tactile Micro-Audio Clicks',
      category: 'Settings',
      icon: isAudioMuted ? <VolumeX className="w-4 h-4 text-stone" /> : <Volume2 className="w-4 h-4 text-terracotta" />,
      run: () => {
        toggleAudioMuted();
      },
    },
    {
      id: 'cv',
      title: 'Download Curriculum Vitae (Summary)',
      category: 'Document',
      icon: <FileText className="w-4 h-4 text-stone" />,
      run: () => {
        window.open(PERSONAL_INFO.github, '_blank');
        onClose();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      playTactileClick('soft');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      playTactileClick('soft');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].run();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative w-full max-w-xl rounded-3xl bg-sand border border-linen p-2 shadow-[0_20px_60px_rgba(26,36,33,0.18)] z-10 overflow-hidden font-sans"
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-linen">
              <Search className="w-4 h-4 text-stone shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent text-sm text-ink placeholder:text-stone/60 focus:outline-none font-mono"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-bone text-stone hover:text-ink transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-stone">
                  No matching commands found for "{query}".
                </div>
              ) : (
                filtered.map((action, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={action.id}
                      onClick={() => {
                        playTactileClick('soft');
                        action.run();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-mono transition-colors duration-150 cursor-pointer ${
                        isSelected
                          ? 'bg-bone text-ink font-medium shadow-sm'
                          : 'text-stone hover:bg-bone/50 hover:text-ink'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="shrink-0">{action.icon}</span>
                        <span className="truncate">{action.title}</span>
                      </div>
                      <span className="text-[10px] text-stone/80 uppercase tracking-wider pl-2 shrink-0">
                        {action.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-linen/70 text-[10px] font-mono text-stone bg-bone/40">
              <span>Use ↑↓ to navigate &bull; ↵ to select</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
