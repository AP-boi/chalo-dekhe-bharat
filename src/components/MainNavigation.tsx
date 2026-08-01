"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchComponent } from '@/components/ui/animated-glowing-search-bar';
import { Search, X, MapPin, Compass, Camera, Target, Landmark, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { ThemeToggle } from '@/components/ui/ThemeToggle';

const NAV_LINKS = [
  { href: '/museum', label: 'Museum', icon: Landmark },
  { href: '/gallery', label: 'Gallery', icon: Camera },
  { href: '/planner', label: 'Planner', icon: Compass },
  { href: '/game', label: 'Mini-Game', icon: Target },
];

const SEARCH_DATA = [
  // Primary Sections
  { id: 'museum', title: 'AI Digital Museum', icon: Landmark, href: '/museum', type: 'Experience' },
  { id: 'gallery', title: '3D Photo Gallery', icon: Camera, href: '/gallery', type: 'Experience' },
  { id: 'planner', title: 'AI Itinerary Planner', icon: Compass, href: '/planner', type: 'Tool' },
  { id: 'game', title: 'Heritage Quiz Mini-Game', icon: Target, href: '/game', type: 'Interactive' },
  
  // Historical Eras
  { id: 'ancient-era', title: 'Ancient Era (Vedic & Mauryan)', icon: Landmark, href: '/museum', type: 'Era' },
  { id: 'medieval-era', title: 'Medieval Era (Chola & Mughal)', icon: Landmark, href: '/museum', type: 'Era' },
  { id: 'modern-era', title: 'Modern Era (Freedom Movement)', icon: Landmark, href: '/museum', type: 'Era' },

  // Key Landmarks & Destinations
  { id: 'taj-mahal', title: 'Taj Mahal, Agra', icon: MapPin, href: '/museum', type: 'Landmark' },
  { id: 'varanasi', title: 'Varanasi Ghats, Uttar Pradesh', icon: MapPin, href: '/museum', type: 'Destination' },
  { id: 'jaipur', title: 'Jaipur Hawa Mahal, Rajasthan', icon: MapPin, href: '/planner', type: 'Destination' },
  { id: 'kerala', title: 'Kerala Backwaters & Alleppey', icon: MapPin, href: '/planner', type: 'Destination' },
  { id: 'goa', title: 'Goa Beaches & Churches', icon: MapPin, href: '/planner', type: 'Destination' },
  { id: 'ladakh', title: 'Pangong Lake & Ladakh', icon: MapPin, href: '/planner', type: 'Destination' },
  { id: 'hampi', title: 'Hampi Ruins, Karnataka', icon: MapPin, href: '/gallery', type: 'Heritage' },
  { id: 'sarnath', title: 'Sarnath Stupa & Ashoka Pillar', icon: MapPin, href: '/museum', type: 'Heritage' },
  { id: 'ajanta', title: 'Ajanta & Ellora Caves', icon: MapPin, href: '/gallery', type: 'Heritage' },
  { id: 'golden-temple', title: 'Golden Temple, Amritsar', icon: MapPin, href: '/gallery', type: 'Destination' },
  { id: 'qutub-minar', title: 'Qutub Minar, Delhi', icon: MapPin, href: '/gallery', type: 'Landmark' },
  { id: 'konark', title: 'Sun Temple Konark, Odisha', icon: MapPin, href: '/gallery', type: 'Landmark' },
];

import { LiquidButton } from '@/components/ui/liquid-glass-button';

export function MainNavigation() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isSearchOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSearchOpen, isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  const filteredResults = SEARCH_DATA.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Floating Header */}
      <header className="fixed top-4 left-0 right-0 z-[60] px-4 sm:px-8 pointer-events-none flex justify-center items-center">
        <div className="w-full max-w-7xl flex items-center justify-between gap-4 pointer-events-auto">
          
          {/* Left: Prominent Larger Brand Title on Liquid Glass in Fancy Yatra One Font */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden rounded-full border border-[#FF6A2B] p-3 text-[#FF6A2B] bg-[#1B1410]/80 backdrop-blur-md hover:bg-[#FF6A2B] hover:text-[#1B1410] transition-colors"
            >
              <Menu size={22} />
            </button>

            <Link href="/">
              <LiquidButton size="xl" className="rounded-full px-8 sm:px-10 py-4 sm:py-5 shadow-2xl">
                <span 
                  className="font-display text-lg sm:text-xl md:text-2xl font-medium tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A2B] via-[#FFB100] to-[#FFF6E9] uppercase whitespace-nowrap drop-shadow-md" 
                  style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
                >
                  Chalo Dekhe Bharat!
                </span>
              </LiquidButton>
            </Link>
          </div>

          {/* Right: Larger Expanded Search Bar & Theme Controls */}
          <div className="flex gap-3 items-center">
            <LiquidButton
              size="lg"
              onClick={() => setIsSearchOpen(true)}
              className="rounded-full px-5 sm:px-7 py-3.5 sm:py-4 text-[#FFF6E9]/80 hover:text-[#FFF6E9] flex items-center gap-3 transition-all cursor-pointer border border-[#FF6A2B]/40 hover:border-[#FF6A2B] shadow-xl"
              title="Search Portal (Click to search)"
            >
              <Search size={22} strokeWidth={2.2} className="text-[#FF6A2B] shrink-0" />
              <span className="hidden sm:inline font-body text-sm sm:text-base font-medium tracking-wide text-[#FFF6E9]/90 pr-2 whitespace-nowrap">
                Search monuments, states, culture...
              </span>
              <kbd className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-bold text-[#FFB100] bg-[#1B1410]/80 rounded-md border border-[#FF6A2B]/40 shadow-sm">
                ⌘K
              </kbd>
            </LiquidButton>

            <ThemeToggle />
          </div>
        </div>
      </header>





      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[85px] left-0 right-0 z-[55] bg-[#1B1410]/95 backdrop-blur-2xl border-b border-[#FF6A2B]/30 p-6 lg:hidden shadow-2xl flex flex-col gap-3"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm font-bold transition-all ${
                    isActive
                      ? "bg-[#FF6A2B] text-[#1B1410] border-[#FF6A2B]"
                      : "bg-[#2A1F19] text-[#FFF6E9] border-[#FF6A2B]/20 hover:border-[#FF6A2B]"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1B1410]/65 backdrop-blur-md flex flex-col items-center pt-[15vh] px-6 pointer-events-auto select-none"
            onClick={(e) => {
              // Clicking outside the search component content closes search
              if (e.target === e.currentTarget) {
                setIsSearchOpen(false);
                setSearchQuery('');
              }
            }}
          >
            <button 
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              className="absolute top-8 right-8 text-[#FFF6E9]/50 hover:text-[#FF6A2B] transition-colors p-2"
            >
              <X size={32} />
            </button>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-3xl"
            >
              <SearchComponent 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="mt-12 flex flex-col gap-2 max-h-[50vh] overflow-y-auto no-scrollbar">
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, i) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.05) }}
                    >
                      <Link 
                        href={result.href}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-between p-6 rounded-xl hover:bg-[#FF6A2B]/10 border border-transparent hover:border-[#FF6A2B]/20 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-full bg-[#1B1410] border border-[#FF6A2B]/30 flex items-center justify-center text-[#FF6A2B] group-hover:bg-[#FF6A2B] group-hover:text-[#1B1410] transition-colors">
                            <result.icon size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-display text-[#FFF6E9] tracking-wide">{result.title}</h3>
                            <p className="text-sm font-body text-[#FFB100] uppercase tracking-widest">{result.type}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <p className="text-[#FFF6E9]/40 font-body text-lg">No destinations found matching &quot;{searchQuery}&quot;</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
