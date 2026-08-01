"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { MUSEUM_ERAS, MuseumEra, Hotspot } from "@/data/museum-eras";
import { useTTS } from "@/lib/hooks/useTTS";
import VideoBackground from "@/components/museum/VideoBackground";
import HotspotLayer from "@/components/museum/HotspotLayer";
import MuseumDrawer from "@/components/museum/MuseumDrawer";

export default function DigitalMuseumPage() {
  const [currentEraIndex, setCurrentEraIndex] = useState<number>(0);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const era: MuseumEra = MUSEUM_ERAS[currentEraIndex];
  const { speak, pause, resume, stop, isSpeaking, isPaused, supported } = useTTS();

  const handleNextEra = () => {
    stop();
    setCurrentEraIndex((prev) => (prev + 1) % MUSEUM_ERAS.length);
  };

  const handlePrevEra = () => {
    stop();
    setCurrentEraIndex((prev) => (prev - 1 + MUSEUM_ERAS.length) % MUSEUM_ERAS.length);
  };

  const handleSelectEra = (index: number) => {
    stop();
    setCurrentEraIndex(index);
  };

  const handleToggleNarration = () => {
    if (isSpeaking) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(`${era.title}. ${era.period}. ${era.audioScript}`);
    }
  };

  return (
    <div className="relative w-full min-h-screen pt-32 sm:pt-36 pb-20 overflow-hidden flex flex-col justify-between select-none bg-[#1B1410]">
      {/* Background AI Video & Fallback Layer */}
      <VideoBackground videoFileName={era.videoFileName} eraTitle={era.title} themeColor={era.themeColor} />

      {/* Hotspots Overlaid on Video */}
      <HotspotLayer hotspots={era.hotspots} onSelectHotspot={setSelectedHotspot} />

      {/* Top Header & Era Controls Overlay */}
      <div className="relative z-30 px-6 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Era Badge & Title */}
        <motion.div
          key={era.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel-gold p-4 rounded-2xl max-w-xl border border-[#FF6A2B]/40"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF6A2B] text-[#FFF6E9] font-mono text-[10px] uppercase font-bold tracking-widest">
              {era.period}
            </span>
            <span className="text-stone-400 text-xs font-semibold">Era {currentEraIndex + 1} of {MUSEUM_ERAS.length}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-extrabold gold-gradient-text leading-tight">
            {era.title}
          </h2>
          <p className="text-xs text-[#FFB100]/90 font-medium mt-1">{era.tagline}</p>
        </motion.div>

        {/* Audio Narration Controller */}
        <div className="flex items-center gap-3">
          {supported && (
            <button
              onClick={handleToggleNarration}
              className={`px-4 py-2.5 rounded-full glass-panel flex items-center gap-2 text-xs font-bold transition-all shadow-xl border ${
                isSpeaking
                  ? "bg-[#FF6A2B] text-[#FFF6E9] border-[#FF6A2B] animate-pulse"
                  : "text-[#FFB100] border-[#FF6A2B]/40 hover:bg-white/10"
              }`}
            >
              {isSpeaking ? (
                isPaused ? (
                  <>
                    <Play className="w-4 h-4" /> Resume Audio
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4" /> Pause Audio
                  </>
                )
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#FFB100]" /> Listen Narration
                </>
              )}
            </button>
          )}

          {/* Nav Prev / Next buttons */}
          <div className="flex items-center gap-1.5 glass-panel p-1 rounded-full border border-[#FF6A2B]/30">
            <button
              onClick={handlePrevEra}
              className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
              title="Previous Era"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextEra}
              className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
              title="Next Era"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Historical Narrative Overlay Box */}
      <div className="relative z-30 px-6 max-w-2xl my-auto">
        <motion.div
          key={`narrative-${era.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-5 rounded-2xl border border-[#FF6A2B]/30 text-[#FFF6E9] text-xs sm:text-sm leading-relaxed"
        >
          <p className="line-clamp-4">{era.narrative}</p>
        </motion.div>
      </div>

      {/* Bottom 7-Era Timeline Navigation Bar */}
      <div className="relative z-30 p-4 sm:p-6 mb-12">
        <div className="max-w-7xl mx-auto glass-panel p-2 rounded-2xl border border-[#FF6A2B]/30 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {MUSEUM_ERAS.map((item, idx) => {
            const isActive = idx === currentEraIndex;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectEra(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex flex-col items-start ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF6A2B] to-[#FFB100] text-[#1B1410] font-bold shadow-lg scale-105"
                    : "text-stone-400 hover:text-stone-100 hover:bg-white/5"
                }`}
              >
                <span>{item.title}</span>
                <span className={`text-[9px] ${isActive ? "text-[#1B1410]" : "text-stone-500"}`}>{item.period}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slide-over Artifact Detail Drawer */}
      <MuseumDrawer hotspot={selectedHotspot} onClose={() => setSelectedHotspot(null)} />
    </div>
  );
}
