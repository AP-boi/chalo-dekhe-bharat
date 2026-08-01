"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Sparkles, MapPin, Compass, ShieldCheck } from "lucide-react";

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-[#1B1410] relative">
      <ContainerScroll
        titleComponent={
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6A2B]/15 border border-[#FF6A2B]/30 text-[#FFB100] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <Sparkles size={14} className="animate-pulse text-[#FF6A2B]" /> Interactive 3D Scroll Perspective
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-semibold text-[#FFF6E9] tracking-tight">
              Uncover the Magic of <br />
              <span className="text-5xl md:text-[6.5rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A2B] via-[#FFB100] to-[#FFF6E9] uppercase leading-none drop-shadow-[0_10px_20px_rgba(255,106,43,0.3)]">
                Incredible India
              </span>
            </h1>
            <p className="text-stone-400 text-sm md:text-base max-w-xl mx-auto font-body">
              Scroll to unfold the 3D portal into India&apos;s timeless wonders, architectural marvels, and rich cultural tapestry.
            </p>
          </div>
        }
      >
        <div className="relative w-full h-full group overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1600&h=900"
            alt="Taj Mahal Agra"
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
            draggable={false}
          />

          {/* Saffron & Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1410] via-transparent to-[#1B1410]/40 pointer-events-none" />

          {/* Floating Top Badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B1410]/80 backdrop-blur-md border border-[#FF6A2B]/30 text-[#FFF6E9] text-xs font-semibold shadow-lg">
            <MapPin size={14} className="text-[#FF6A2B]" />
            <span>Taj Mahal — Agra, Uttar Pradesh</span>
          </div>

          {/* Floating UNESCO Badge */}
          <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFB100]/20 backdrop-blur-md border border-[#FFB100]/40 text-[#FFB100] text-xs font-bold uppercase tracking-wider shadow-lg">
            <ShieldCheck size={14} />
            <span>UNESCO World Heritage</span>
          </div>

          {/* Bottom Glassmorphism Info Bar */}
          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#1B1410]/85 backdrop-blur-xl border border-[#FF6A2B]/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF6A2B]/20 border border-[#FF6A2B]/40 flex items-center justify-center text-[#FF6A2B]">
                <Compass size={24} />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-[#FFF6E9] uppercase">Digital Heritage Portal</h4>
                <p className="font-body text-xs text-stone-300">Explore 100+ Monuments • 7 Historical Eras • 3D Globe</p>
              </div>
            </div>

            <div className="flex items-center gap-6 divide-x divide-[#FF6A2B]/20 text-center">
              <div className="px-3">
                <p className="font-display text-xl font-bold text-[#FFB100]">28</p>
                <p className="font-body text-[10px] text-stone-400 uppercase">States</p>
              </div>
              <div className="px-3">
                <p className="font-display text-xl font-bold text-[#FF6A2B]">360°</p>
                <p className="font-body text-[10px] text-stone-400 uppercase">AI Tours</p>
              </div>
              <div className="px-3">
                <p className="font-display text-xl font-bold text-[#FFF6E9]">4.9★</p>
                <p className="font-body text-[10px] text-stone-400 uppercase">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}

