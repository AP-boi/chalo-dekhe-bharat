"use client";

import { motion } from "framer-motion";
import { MapPin, Sparkles, Flag } from "lucide-react";
import { Hotspot } from "@/data/museum-eras";

interface HotspotLayerProps {
  hotspots: Hotspot[];
  onSelectHotspot: (hotspot: Hotspot) => void;
}

export default function HotspotLayer({ hotspots, onSelectHotspot }: HotspotLayerProps) {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      {hotspots.map((hotspot) => (
        <div
          key={hotspot.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto group"
          style={{ left: hotspot.position2D.x, top: hotspot.position2D.y }}
        >
          {/* Pulsing ring around hotspot */}
          <div className="absolute -inset-3 rounded-full bg-[#f5a623]/20 animate-ping pointer-events-none" />

          {/* Interactive Button Pin */}
          <button
            onClick={() => onSelectHotspot(hotspot)}
            aria-label={`Inspect ${hotspot.title}`}
            className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#8b1a1a] via-[#f5a623] to-[#c8a951] p-0.5 shadow-xl shadow-amber-950/60 hover:scale-125 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <div className="w-full h-full bg-[#1a1040] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#f5a623] group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </button>

          {/* Hover Tooltip Box */}
          <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none w-48 p-2.5 rounded-xl glass-panel-gold text-center border border-amber-500/50 shadow-2xl">
            <p className="text-xs font-bold text-white leading-tight mb-0.5">{hotspot.title}</p>
            <p className="text-[10px] text-amber-300 font-medium">{hotspot.subtitle}</p>
            <div className="mt-1 flex items-center justify-center gap-1 text-[9px] text-stone-300/80">
              <Flag className="w-2.5 h-2.5 text-amber-400" />
              <span>Click to inspect detail</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
