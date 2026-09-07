import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';

/**
 * Preloader
 * Introductory screen with minimal monospace 00-100 counter
 * and curtain-slice exit tailored for Muhammad Kafka Lyandra Pratama.
 */
export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = current < 60 ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 8) + 4;
      current = Math.min(100, current + increment);
      setCount(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
        }, 220);
      }
    }, 32);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFinished && (
        <motion.div
          key="preloader-curtain"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { 
              duration: 0.85, 
              ease: [0.76, 0, 0.24, 1] 
            } 
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-14 bg-sand text-ink select-none overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-stone">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse"></span>
              {PERSONAL_INFO.name.toUpperCase()}
            </span>
            <span>{PERSONAL_INFO.school.toUpperCase()} // WIB</span>
          </div>

          {/* Central Monospace Counter */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-7xl sm:text-9xl md:text-[11rem] font-light font-mono tracking-tighter text-ink leading-none"
              >
                {String(count).padStart(3, '0')}
              </motion.div>
            </div>
            
            <div className="w-48 sm:w-64 h-[1px] bg-linen mt-8 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-terracotta"
                style={{ width: `${count}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Bottom Metas */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-stone uppercase tracking-wider">
            <div className="flex items-center gap-4">
              <span>BACKEND</span>
              <span className="text-linen">•</span>
              <span>ZERO-TRUST RBAC</span>
              <span className="text-linen">•</span>
              <span>SYSTEMS</span>
            </div>
            <span>INITIALIZING PLATFORM [{count}%]</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
