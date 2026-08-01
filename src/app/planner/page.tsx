'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, MapPin, Calendar, Wallet, Users, ChevronDown, ChevronUp, Clock, Utensils, Home as HomeIcon, Bus, CheckCircle2, RefreshCw, Share2, Copy, FileText, Check } from 'lucide-react';
import { TripItinerary } from '@/lib/schemas/itinerary';
import { PRESET_ITINERARIES } from '@/data/cached-itineraries';
import PlannerGlobe3D from '@/components/planner/PlannerGlobe3D';

const QUICK_DESTINATIONS = [
  { name: 'Jaipur', label: 'Pink City, Rajasthan' },
  { name: 'Kerala', label: 'Backwaters & Hills' },
  { name: 'Varanasi', label: 'Sacred Ganges Ghats' },
  { name: 'Agra', label: 'Taj Mahal & Mughals' },
  { name: 'Goa', label: 'Sun, Sea & Portuguese' },
  { name: 'Ladakh', label: 'Himalayan Pass' },
];

export default function PlannerPage() {
  const [destination, setDestination] = useState<string>('Jaipur');
  const [customDestination, setCustomDestination] = useState<string>('');
  const [durationDays, setDurationDays] = useState<number>(3);
  const [budgetTier, setBudgetTier] = useState<'Budget' | 'Moderate' | 'Luxury'>('Moderate');
  const [travelStyle, setTravelStyle] = useState<'Solo' | 'Couple' | 'Family' | 'Friends'>('Couple');
  
  const [itinerary, setItinerary] = useState<TripItinerary | null>(PRESET_ITINERARIES['Jaipur']);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'packing'>('daily');
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  const handleGenerate = async (targetDest?: string) => {
    const finalDest = targetDest || customDestination || destination;
    if (!finalDest) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: finalDest,
          durationDays,
          budgetTier,
          travelStyle,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setItinerary(data);
        setSelectedDayIndex(0);
      }
    } catch (err) {
      console.error('Failed to generate itinerary:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyItinerary = () => {
    if (!itinerary) return;
    const text = `${itinerary.tripTitle}\n${itinerary.durationDays} Days | ${itinerary.budgetTier} Budget\n\n` +
      itinerary.dailyItinerary.map(d => `Day ${d.dayNumber}: ${d.theme}\n- Morning: ${d.activities.morning.name}\n- Afternoon: ${d.activities.afternoon.name}\n- Evening: ${d.activities.evening.name}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedNotice('Copied itinerary to clipboard!');
    setTimeout(() => setCopiedNotice(null), 3000);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedNotice('Share link copied to clipboard!');
    setTimeout(() => setCopiedNotice(null), 3000);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const currentDestName = customDestination || destination;

  return (
    <div className="relative w-full min-h-screen bg-[#1B1410] text-[#FFF6E9] pt-32 sm:pt-36 pb-32 px-4 sm:px-6 lg:px-12 select-none overflow-x-hidden">
      
      {/* Top Section Headline */}
      <div className="max-w-7xl mx-auto mb-8 text-center sm:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#FF6A2B]/20 pb-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#FFB100]/10 border border-[#FFB100]/30 text-[#FFB100] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6A2B]" /> AI Travel Concierge
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-[#FFF6E9]">
            AI Travel <span className="text-[#FF6A2B]">Planner</span>
          </h1>
          <p className="font-body text-[#FFF6E9]/70 text-sm sm:text-base mt-2 max-w-xl">
            Design personalized Indian itineraries complete with day-by-day activities, local culinary guides, ₹ cost estimates, and real-time 3D globe mapping.
          </p>
        </div>

        {/* Total Cost Badge */}
        {itinerary && (
          <div className="glass-panel p-4 rounded-2xl border border-[#FF6A2B]/30 flex items-center gap-4 bg-[#2A1F19]">
            <div className="p-3 rounded-xl bg-[#FF6A2B] text-[#FFF6E9]">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">Estimated Total Cost</span>
              <span className="font-mono text-2xl font-bold text-[#FFB100]">
                ₹{itinerary.totalEstimatedCostINR.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Control Form & 3D Globe + Itinerary Viewer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Preferences */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Destination Chips */}
          <div className="glass-panel p-6 rounded-3xl border border-[#FF6A2B]/30 space-y-5 bg-[#2A1F19]/90 shadow-2xl">
            <h2 className="font-display text-xl font-bold text-[#FFF6E9] uppercase flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF6A2B]" /> 1. Select Destination
            </h2>

            {/* Chips */}
            <div className="grid grid-cols-2 gap-2.5">
              {QUICK_DESTINATIONS.map((item) => {
                const isSelected = destination === item.name && !customDestination;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setDestination(item.name);
                      setCustomDestination('');
                    }}
                    className={`p-3 rounded-xl text-left text-xs font-semibold transition-all border ${
                      isSelected
                        ? "bg-[#FF6A2B] text-[#FFF6E9] border-[#FF6A2B] font-bold shadow-lg"
                        : "bg-[#1B1410]/60 text-stone-300 border-[#FF6A2B]/20 hover:border-[#FF6A2B]/50 hover:bg-[#FF6A2B]/10"
                    }`}
                  >
                    <div className="font-bold">{item.name}</div>
                    <div className={`text-[10px] ${isSelected ? "text-[#FFF6E9]/80" : "text-stone-500"}`}>{item.label}</div>
                  </button>
                );
              })}
            </div>

            {/* Custom Input */}
            <div>
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                Or type custom Indian city / region
              </label>
              <input
                type="text"
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                placeholder="e.g. Udaipur, Amritsar, Rishikesh..."
                className="w-full bg-[#1B1410] border border-[#FF6A2B]/30 rounded-xl px-4 py-3 text-sm text-[#FFF6E9] placeholder-stone-600 focus:outline-none focus:border-[#FF6A2B]"
              />
            </div>
          </div>

          {/* Trip Duration & Preferences */}
          <div className="glass-panel p-6 rounded-3xl border border-[#FF6A2B]/30 space-y-6 bg-[#2A1F19]/90 shadow-2xl">
            <h2 className="font-display text-xl font-bold text-[#FFF6E9] uppercase flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#FF6A2B]" /> 2. Trip Customization
            </h2>

            {/* Duration Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-stone-300">Duration</span>
                <span className="text-[#FFB100] font-mono font-bold text-sm">{durationDays} Days</span>
              </div>
              <input
                type="range"
                min={1}
                max={14}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full accent-[#FF6A2B] bg-[#1B1410] h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                <span>1 Day</span>
                <span>7 Days</span>
                <span>14 Days</span>
              </div>
            </div>

            {/* Budget Tier Buttons */}
            <div>
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                Budget Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Budget', 'Moderate', 'Luxury'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setBudgetTier(tier)}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      budgetTier === tier
                        ? "bg-[#FF6A2B] text-[#FFF6E9] border-[#FF6A2B]"
                        : "bg-[#1B1410]/60 text-stone-400 border-[#FF6A2B]/20 hover:text-white"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Style Buttons */}
            <div>
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#FF6A2B]" /> Travel Group Style
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Solo', 'Couple', 'Family', 'Friends'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setTravelStyle(style)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      travelStyle === style
                        ? "bg-[#FFB100] text-[#1B1410] border-[#FFB100]"
                        : "bg-[#1B1410]/60 text-stone-400 border-[#FF6A2B]/20 hover:text-white"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Submit Button */}
            <button
              onClick={() => handleGenerate()}
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6A2B] to-[#FFB100] text-[#1B1410] font-bold text-sm uppercase tracking-wider shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" /> Concierge Crafting Itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Generate AI Itinerary
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Column: Interactive 3D Globe & Detailed Itinerary */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 3D Interactive Globe Container (NO 2D FALLBACK) */}
          <div className="relative w-full h-[400px] sm:h-[450px] rounded-3xl bg-[#140E0A] border border-[#FF6A2B]/30 overflow-hidden shadow-2xl">
            
            {/* Globe Canvas */}
            {itinerary && (
              <PlannerGlobe3D
                days={itinerary.dailyItinerary}
                selectedDayIndex={selectedDayIndex}
                onSelectDay={(idx) => setSelectedDayIndex(idx)}
                className="w-full h-full"
              />
            )}

            {/* Overlay Title */}
            <div className="absolute top-4 left-4 pointer-events-none px-3 py-1.5 rounded-full bg-[#1B1410]/80 backdrop-blur-md border border-[#FF6A2B]/30 text-xs text-[#FFF6E9] font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6A2B] animate-ping" />
              <span>3D Route Globe • {itinerary?.destination || currentDestName}</span>
            </div>
          </div>

          {/* Itinerary Results Accordion & Details */}
          {itinerary && (
            <div className="glass-panel p-6 rounded-3xl border border-[#FF6A2B]/30 bg-[#2A1F19]/90 space-y-6 shadow-2xl">
              
              {/* Header Title & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#FF6A2B]/20 pb-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#FFF6E9] uppercase leading-tight">
                    {itinerary.tripTitle}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-[#FFB100] font-semibold mt-1">
                    <span>{itinerary.durationDays} Days</span>
                    <span>•</span>
                    <span>{itinerary.budgetTier} Budget</span>
                    <span>•</span>
                    <span>{itinerary.travelStyle} Trip</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyItinerary}
                    className="px-3 py-2 rounded-xl bg-[#1B1410] border border-[#FF6A2B]/30 text-xs font-bold text-[#FFF6E9] hover:border-[#FF6A2B] hover:text-[#FFB100] transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Copy Itinerary Text"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#FF6A2B]" />
                    <span>Copy</span>
                  </button>

                  <button
                    onClick={handleShareLink}
                    className="px-3 py-2 rounded-xl bg-[#1B1410] border border-[#FF6A2B]/30 text-xs font-bold text-[#FFF6E9] hover:border-[#FF6A2B] hover:text-[#FFB100] transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Share Link"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#FF6A2B]" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={handleExportPDF}
                    className="px-3.5 py-2 rounded-xl bg-[#FF6A2B] text-[#FFF6E9] text-xs font-bold hover:bg-[#FFB100] hover:text-[#1B1410] transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
                    title="Export / Print PDF"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              {copiedNotice && (
                <div className="px-3.5 py-2 rounded-xl bg-[#FFB100]/10 border border-[#FFB100]/40 text-[#FFB100] text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6A2B]" />
                  <span>{copiedNotice}</span>
                </div>
              )}

              {/* Day Selection Bar */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {itinerary.dailyItinerary.map((day, idx) => {
                  const isSelected = selectedDayIndex === idx;
                  return (
                    <button
                      key={day.dayNumber}
                      onClick={() => setSelectedDayIndex(idx)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                        isSelected
                          ? "bg-[#FF6A2B] text-[#FFF6E9] border-[#FF6A2B] shadow-lg scale-105"
                          : "bg-[#1B1410] text-stone-400 border-[#FF6A2B]/20 hover:text-white"
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-[#FFB100] text-[#1B1410] font-mono text-[10px] flex items-center justify-center font-bold">
                        {day.dayNumber}
                      </span>
                      <span>{day.locationName.split('&')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Active Day View */}
              {selectedDayIndex !== null && itinerary.dailyItinerary[selectedDayIndex] && (
                <motion.div
                  key={`day-${selectedDayIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-2"
                >
                  {/* Day Theme */}
                  <div className="p-4 rounded-2xl bg-[#1B1410] border border-[#FF6A2B]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#FFB100] uppercase tracking-wider block">
                        Day {itinerary.dailyItinerary[selectedDayIndex].dayNumber} Theme
                      </span>
                      <h3 className="text-lg font-display font-bold text-[#FFF6E9]">
                        {itinerary.dailyItinerary[selectedDayIndex].theme}
                      </h3>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Day Est.</span>
                      <span className="text-base font-bold text-[#FFB100]">
                        ₹{itinerary.dailyItinerary[selectedDayIndex].estimatedCostINR.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Morning, Afternoon, Evening Activity Cards */}
                  <div className="space-y-3">
                    {[
                      { title: 'Morning', data: itinerary.dailyItinerary[selectedDayIndex].activities.morning, color: 'text-amber-400' },
                      { title: 'Afternoon', data: itinerary.dailyItinerary[selectedDayIndex].activities.afternoon, color: 'text-orange-400' },
                      { title: 'Evening', data: itinerary.dailyItinerary[selectedDayIndex].activities.evening, color: 'text-red-400' },
                    ].map((act, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-[#140E0A] border border-[#FF6A2B]/20 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className={`uppercase tracking-wider ${act.color} flex items-center gap-1.5`}>
                            <Clock className="w-3.5 h-3.5" /> {act.title} ({act.data.timeSlot})
                          </span>
                          <span className="text-stone-400 flex items-center gap-1 text-[11px]">
                            <MapPin className="w-3 h-3 text-[#FF6A2B]" /> {act.data.location}
                          </span>
                        </div>
                        <h4 className="font-display text-base font-bold text-[#FFF6E9]">{act.data.name}</h4>
                        <p className="text-xs text-stone-300 leading-relaxed">{act.data.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Food & Stay Tips */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Food */}
                    <div className="p-4 rounded-2xl bg-[#140E0A] border border-[#FF6A2B]/20 space-y-2">
                      <span className="text-xs font-bold text-[#FFB100] uppercase tracking-wider flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5" /> Food & Culinary Delicacies
                      </span>
                      <div className="space-y-1.5 text-xs text-stone-300">
                        {itinerary.dailyItinerary[selectedDayIndex].food.map((f, i) => (
                          <div key={i} className="flex justify-between border-b border-stone-800 pb-1">
                            <span className="font-semibold text-[#FFF6E9]">{f.meal}:</span>
                            <span className="text-right text-stone-400">{f.suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stay & Transport */}
                    <div className="p-4 rounded-2xl bg-[#140E0A] border border-[#FF6A2B]/20 space-y-3">
                      <div>
                        <span className="text-xs font-bold text-[#FFB100] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                          <HomeIcon className="w-3.5 h-3.5" /> Recommended Accommodation
                        </span>
                        <p className="text-xs text-stone-300">{itinerary.dailyItinerary[selectedDayIndex].stay}</p>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-[#FFB100] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                          <Bus className="w-3.5 h-3.5" /> Transit & Transport Tip
                        </span>
                        <p className="text-xs text-stone-300">{itinerary.dailyItinerary[selectedDayIndex].transportTip}</p>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* Packing Tips */}
              <div className="pt-4 border-t border-[#FF6A2B]/20">
                <span className="text-xs font-bold text-[#FFB100] uppercase tracking-wider block mb-2">
                  Essential Packing Tips
                </span>
                <div className="space-y-1.5">
                  {itinerary.packingTips.map((tip, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6A2B] shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
