import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, KeyRound, Check, RefreshCw, AlertTriangle } from 'lucide-react';
import { playTactileClick } from '../utils/audio';

/**
 * TokenSandbox
 * Embedded interactive micro-simulator for the OSIS Voting v2 project.
 * Demonstrates single-use expiring cryptographic token logic and 403 Forbidden defense.
 */
export default function TokenSandbox() {
  const [token, setToken] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState('01');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown timer for active token
  useEffect(() => {
    let timer = null;
    if (token && !hasVoted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [token, hasVoted, timeLeft]);

  const generateToken = () => {
    playTactileClick('soft');
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'OSIS-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setToken(code);
    setTimeLeft(60);
    setHasVoted(false);
  };

  const castBallot = () => {
    if (!token || hasVoted || timeLeft <= 0) return;
    playTactileClick('snap');
    setIsSubmitting(true);

    setTimeout(() => {
      setHasVoted(true);
      setIsSubmitting(false);
      playTactileClick('forbidden');
    }, 450);
  };

  const isExpired = timeLeft === 0 && token && !hasVoted;

  return (
    <div className="mt-6 p-5 rounded-2xl bg-sand border border-linen/90 shadow-sm text-xs font-mono">
      {/* Sandbox Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-linen/70">
        <div className="flex items-center gap-2 text-ink font-semibold uppercase tracking-wider">
          <KeyRound className="w-3.5 h-3.5 text-terracotta" />
          <span>Interactive Token Sandbox (Zero-Trust)</span>
        </div>
        <span className="text-[10px] text-stone">Single-Use Ballot API</span>
      </div>

      {!token ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-bone/60 border border-linen">
          <p className="text-stone leading-relaxed">
            Generate a simulated cryptographic ballot token to test the single-use expiration and 403 Forbidden defense.
          </p>
          <button
            onClick={generateToken}
            className="px-4 py-2 rounded-xl bg-ink text-sand hover:bg-terracotta transition-colors duration-200 uppercase tracking-wider shrink-0 cursor-pointer font-medium"
          >
            Generate Token
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Token Display and Timer Bar */}
          <div className="p-3.5 rounded-xl bg-bone border border-linen flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-stone uppercase text-[11px]">Active Token:</span>
              <span className={`px-2.5 py-1 rounded bg-sand border font-bold text-sm tracking-widest ${
                hasVoted 
                  ? 'line-through text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40' 
                  : isExpired
                  ? 'line-through text-stone border-linen'
                  : 'text-ink border-linen'
              }`}>
                {token}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-stone text-[11px]">Expires:</span>
              <span className={`tabular-nums font-bold ${timeLeft < 15 ? 'text-rose-700 animate-pulse' : 'text-stone'}`}>
                {String(timeLeft).padStart(2, '0')}s
              </span>
            </div>
          </div>

          {/* Real-time Expiration Bar */}
          {!hasVoted && (
            <div className="w-full h-1.5 bg-linen/50 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft < 15 ? 'bg-rose-600' : 'bg-terracotta'
                }`}
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              />
            </div>
          )}

          {/* Voting Action or Expired Result */}
          {!hasVoted && !isExpired ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-stone uppercase text-[11px]">Select Paslon:</span>
                <div className="flex gap-1.5">
                  {['01', '02'].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCandidate(c);
                        playTactileClick('soft');
                      }}
                      className={`px-3 py-1 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                        selectedCandidate === c
                          ? 'bg-ink text-sand border-ink'
                          : 'bg-sand text-stone border-linen hover:border-ink'
                      }`}
                    >
                      Paslon {c}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={castBallot}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-terracotta text-sand font-semibold uppercase tracking-wider hover:bg-terracotta-hover transition-colors duration-200 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Verifying Token...' : 'Cast Ballot (1x Use)'}
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                hasVoted 
                  ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200' 
                  : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-700 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider block text-xs">
                    {hasVoted ? 'TOKEN EXPIRED // HTTP 403 FORBIDDEN' : 'TOKEN TIMED OUT // 408 REQUEST TIMEOUT'}
                  </span>
                  <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed font-sans">
                    {hasVoted 
                      ? `Token ${token} has been purged from active ballot authorization. Re-submission attempt rejected by Supabase zero-trust rule.` 
                      : `Token ${token} exceeded the 60-second valid window without being cast.`}
                  </p>
                </div>
              </div>

              <button
                onClick={generateToken}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sand border border-linen text-ink hover:border-ink transition-colors uppercase text-[11px] font-semibold shrink-0 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Sandbox</span>
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
