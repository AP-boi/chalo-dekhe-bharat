"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Landmark } from "lucide-react";
import { Hotspot } from "@/data/museum-eras";

interface MuseumDrawerProps {
  hotspot: Hotspot | null;
  onClose: () => void;
}

export default function MuseumDrawer({ hotspot, onClose }: MuseumDrawerProps) {
  if (!hotspot) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-md h-full bg-[#1B1410] border-l border-[#FF6A2B]/30 p-6 overflow-y-auto custom-scrollbar flex flex-col justify-between shadow-2xl"
          data-lenis-prevent
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#FF6A2B]/20 mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#FF6A2B]/20 text-[#FFB100]">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#FFB100] uppercase">
                    Artifact Spotlight
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#FFF6E9]">{hotspot.title}</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#FFB100]/80 uppercase tracking-wider block mb-1">
                  Architecture & Style
                </span>
                <p className="text-sm font-medium text-[#FFF6E9]">{hotspot.subtitle}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Historical Description
                </span>
                <p className="text-stone-300 text-sm leading-relaxed">{hotspot.description}</p>
              </div>

              <div className="p-4 rounded-2xl glass-panel-gold border border-[#FF6A2B]/40">
                <div className="flex items-center gap-2 mb-2 text-[#FFB100] font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#FF6A2B]" />
                  <span>Cultural Significance</span>
                </div>
                <p className="text-xs text-[#FFF6E9]/90 leading-normal">{hotspot.significance}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#FF6A2B]/20 mt-6">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6A2B] to-[#FFB100] text-[#1B1410] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
            >
              Return to Museum View
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
