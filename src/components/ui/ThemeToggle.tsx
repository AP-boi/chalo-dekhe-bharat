'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  const applyTheme = (targetTheme: 'dark' | 'light') => {
    if (targetTheme === 'light') {
      document.documentElement.classList.add('light');
      document.body.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.body.classList.remove('light');
    }
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="rounded-full border border-[#FF6A2B] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#FF6A2B] opacity-70 cursor-pointer"
      >
        <Moon size={18} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      className="rounded-full border border-[#FF6A2B] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#FF6A2B] hover:bg-[#FF6A2B] hover:text-[#1B1410] transition-colors relative overflow-hidden group cursor-pointer"
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {theme === 'dark' ? (
          <Sun size={18} strokeWidth={2} className="text-[#FFB100] group-hover:text-[#1B1410] transition-colors" />
        ) : (
          <Moon size={18} strokeWidth={2} className="text-[#FF6A2B] group-hover:text-[#1B1410] transition-colors" />
        )}
      </motion.div>
    </button>
  );
}
