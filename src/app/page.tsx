'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Map, Camera, Target, Landmark, ArrowRight } from 'lucide-react';
import { SquigglyText } from '@/components/ui/squiggly-text';
import { MagneticButton } from '@/components/ui/magnetic-button';
import HeroScrollDemo from '@/components/container-scroll-animation-demo';
import TextFlippingBoardDemo from '@/components/text-flipping-board-demo';
import { Globe3D, GlobeMarker } from '@/components/ui/3d-globe';

const SAMPLE_GLOBE_MARKERS: GlobeMarker[] = [
  {
    lat: 27.1751,
    lng: 78.0421,
    src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&auto=format&fit=crop',
    label: 'Taj Mahal',
    state: 'Agra, Uttar Pradesh',
    category: 'UNESCO World Heritage',
    description: 'An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of Mughal emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal.',
    linkHref: '/museum',
  },
  {
    lat: 25.3176,
    lng: 82.9739,
    src: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=300&auto=format&fit=crop',
    label: 'Varanasi Ghats',
    state: 'Varanasi, Uttar Pradesh',
    category: 'Spiritual Capital',
    description: 'One of the oldest continuously inhabited cities in human history. Famed for its 84 sacred riverfront ghats along the holy Ganges and evening Ganga Aarti ceremonies.',
    linkHref: '/museum',
  },
  {
    lat: 26.9124,
    lng: 75.7873,
    src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&auto=format&fit=crop',
    label: 'Hawa Mahal & Jaipur',
    state: 'Jaipur, Rajasthan',
    category: 'Royal Heritage',
    description: 'The iconic "Palace of Winds" featuring 953 intricate honeycomb lattice windows built in 1799 by Maharaja Sawai Pratap Singh in the Pink City of Jaipur.',
    linkHref: '/gallery',
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&auto=format&fit=crop',
    label: 'New Delhi & Red Fort',
    state: 'National Capital Region',
    category: 'Historic Capital',
    description: 'The historic heart of India featuring the Red Fort, Qutub Minar, and Humayun’s Tomb — bridging Mughal grandeur with modern Indian democracy.',
    linkHref: '/museum',
  },
  {
    lat: 18.922,
    lng: 72.8347,
    src: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=300&auto=format&fit=crop',
    label: 'Gateway of India',
    state: 'Mumbai, Maharashtra',
    category: 'Colonial Landmark',
    description: 'Erected on the waterfront of Mumbai, this grand arch monument commemorates the 1911 landing of King George V and Queen Mary in India.',
    linkHref: '/planner',
  },
  {
    lat: 9.9312,
    lng: 76.2673,
    src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&auto=format&fit=crop',
    label: 'Kerala Backwaters',
    state: 'Alleppey, Kerala',
    category: 'Natural Wonder',
    description: 'A serene labyrinth of interconnected canals, lagoons, and lakes stretching parallel to the Arabian Sea, famous for traditional Kettuvalam houseboats.',
    linkHref: '/planner',
  },
  {
    lat: 15.335,
    lng: 76.46,
    src: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?w=300&auto=format&fit=crop',
    label: 'Hampi Ruins',
    state: 'Vijayanagara, Karnataka',
    category: 'UNESCO World Heritage',
    description: 'Vast boulder-strewn ruins of Vijayanagara, the 14th-century capital of the prosperous Hindu Vijayanagara Empire, featuring the iconic Stone Chariot.',
    linkHref: '/museum',
  },
];


const fadeInUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.15,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  }),
};


export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-[#1B1410] overflow-x-hidden">

      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen pt-32 px-6 lg:px-24 flex flex-col justify-center items-start pb-12 overflow-hidden bg-[#1B1410]">
        {/* Video Background with fallback */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        >
          <source src="/museum-entrance.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#1B1410]/70 z-0 pointer-events-none"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariant}
          custom={0}
          className="flex flex-col z-10 w-full max-w-4xl pt-12 lg:pt-20"
        >
          <p className="font-display text-lg md:text-2xl font-medium tracking-wide text-[#FFB100] mb-4 uppercase drop-shadow-md">
            India&apos;s ultimate digital tourism platform
          </p>
          <h1 className="font-display text-6xl md:text-[110px] lg:text-[140px] font-bold leading-[0.85] tracking-tight text-[#FFF6E9] uppercase m-0 drop-shadow-xl">
            DISCOVER<br/>
            <SquigglyText
              stepDuration={70}
              scale={[4, 6]}
              className="text-[#FF6A2B]"
            >
              BHARAT.
            </SquigglyText>
          </h1>
          <p className="font-body text-[#FFF6E9] text-lg lg:text-xl mt-8 max-w-2xl font-medium opacity-100 drop-shadow-md leading-relaxed">
            A journey through India’s heritage, culture, landscapes, and hidden destinations. 
            Experience our AI video digital museum, gamified landmark challenges, and interactive 3D globe.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <MagneticButton>
              <Link href="/museum" className="rounded-full bg-[#FF6A2B] text-[#FFF6E9] px-10 py-5 text-lg font-semibold hover:scale-105 hover:bg-[#E85A1F] transition-all shadow-xl flex items-center gap-3">
                Start Exploring <Compass size={20} />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/game" className="rounded-full border-2 border-[#FF6A2B] bg-[#1B1410]/50 backdrop-blur-sm text-[#FF6A2B] px-10 py-5 text-lg font-semibold hover:scale-105 hover:bg-[#FF6A2B] hover:text-[#1B1410] transition-all flex items-center gap-3">
                Play Landmark Quiz
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      {/* Container Scroll Animation Section */}
      <section className="w-full bg-[#1B1410] overflow-hidden">
        <HeroScrollDemo />
      </section>

      {/* Dotted Divider */}
      <div className="w-full border-b border-dotted border-[#FF6A2B] opacity-40"></div>

      {/* 3D Globe Section (Featured Interactive Model) */}
      <section className="relative w-full py-20 px-6 lg:px-24 bg-[#140E0A] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUpVariant}
            custom={0}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs font-bold text-[#FFB100] uppercase tracking-widest px-3 py-1 rounded-full bg-[#FFB100]/10 border border-[#FFB100]/30 inline-block">
              Interactive 3D Experience
            </span>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-[#FFF6E9] leading-tight uppercase">
              Spin the <span className="text-[#FF6A2B]">Interactive Globe</span>
            </h2>
            <p className="font-body text-stone-300 text-base leading-relaxed">
              Explore major heritage landmarks across the Indian subcontinent mapped directly onto an interactive 3D Earth globe. Drag to rotate and inspect pin drops.
            </p>
            <div className="pt-2">
              <Link href="/museum" className="inline-flex items-center gap-2 text-[#FF6A2B] font-bold text-sm uppercase tracking-wider hover:text-[#FFB100] transition-colors">
                Enter Museum Scene <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUpVariant}
            custom={1}
            className="lg:col-span-7 h-[500px] rounded-3xl bg-[#1B1410]/80 border border-[#FF6A2B]/20 overflow-hidden shadow-2xl relative group"
          >
            <Globe3D
              className="h-full w-full"
              markers={SAMPLE_GLOBE_MARKERS}
              config={{
                radius: 2.1,
                atmosphereColor: '#ff9933',
                showAtmosphere: true,
                atmosphereIntensity: 0.8,
                bumpScale: 3,
                autoRotateSpeed: 0.4,
                enableZoom: true,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Dotted Divider */}
      <div className="w-full border-b border-dotted border-[#FF6A2B] opacity-40"></div>

      {/* Feature Showcase Grid */}
      <section className="relative w-full py-24 px-6 lg:px-24 bg-[#140E0A]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUpVariant}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl lg:text-[80px] font-bold leading-none text-[#FFF6E9] uppercase tracking-tight mb-4">
            Four Ways to <span className="text-[#FF6A2B]">Explore</span>
          </h2>
          <p className="font-body text-stone-300 text-lg max-w-2xl mx-auto">
            Our platform turns every virtual step into an immersive cultural discovery.
          </p>
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Card 1 - Museum */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUpVariant}
            custom={0}
            className="group rounded-3xl bg-[#1B1410] p-10 border border-[#FF6A2B]/20 hover:border-[#FFB100] transition-all hover:-translate-y-2 relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
              <Landmark size={100} className="text-[#FFB100]" />
            </div>
            <h3 className="font-display text-4xl text-[#FFF6E9] mb-4 uppercase">Digital Museum</h3>
            <p className="font-body text-[#FFF6E9]/70 mb-8 leading-relaxed">
              Bring India&apos;s history to life. Explore 7 historical eras, AI video loops, interactive hotspots, and audio narration.
            </p>
            <Link href="/museum" className="inline-flex items-center gap-2 text-[#FF6A2B] font-body font-bold uppercase tracking-wider group-hover:text-[#FFB100] transition-colors">
              Enter Museum <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Card 2 - Landmark Quiz */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUpVariant}
            custom={1}
            className="group rounded-3xl bg-[#FF6A2B] p-10 border border-[#1B1410]/10 hover:shadow-2xl hover:-translate-y-2 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <Target size={100} className="text-[#1B1410]" />
            </div>
            <h3 className="font-display text-4xl text-[#1B1410] mb-4 uppercase">Landmark Quiz</h3>
            <p className="font-body text-[#1B1410]/80 mb-8 leading-relaxed font-medium">
              Test your knowledge. Complete 10 landmark questions with 15s timer rings, streak points, and achievement unlocks.
            </p>
            <Link href="/game" className="inline-flex items-center gap-2 text-[#FFF6E9] font-body font-bold uppercase tracking-wider hover:text-[#1B1410] transition-colors">
              Play Now <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Card 3 - Photo Gallery */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUpVariant}
            custom={2}
            className="group rounded-3xl bg-[#2A1F19] p-10 border border-[#FF6A2B]/20 hover:border-[#FFB100] hover:-translate-y-2 transition-all relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
              <Camera size={100} className="text-[#FFB100]" />
            </div>
            <h3 className="font-display text-4xl text-[#FFF6E9] mb-4 uppercase">Photo Gallery</h3>
            <p className="font-body text-[#FFF6E9]/70 mb-8 leading-relaxed">
              Celebrate India&apos;s breathtaking landscapes and vibrant culture through visual journeys.
            </p>
            <Link href="/gallery" className="inline-flex items-center gap-2 text-[#FF6A2B] font-body font-bold uppercase tracking-wider group-hover:text-[#FFB100] transition-colors">
              View Gallery <ArrowRight size={16} />
            </Link>
          </motion.div>


          {/* Card 4 - Travel Planner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUpVariant}
            custom={3}
            className="group rounded-3xl bg-[#1B1410] p-10 border border-[#FF6A2B]/20 hover:border-[#FFB100] hover:-translate-y-2 transition-all relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
              <Map size={100} className="text-[#FFB100]" />
            </div>
            <h3 className="font-display text-4xl text-[#FFF6E9] mb-4 uppercase">Travel Planner</h3>
            <p className="font-body text-[#FFF6E9]/70 mb-8 leading-relaxed">
              Explore future personalized travel itineraries tailored for duration, budget, and cultural interests.
            </p>
            <Link href="/planner" className="inline-flex items-center gap-2 text-[#FF6A2B] font-body font-bold uppercase tracking-wider group-hover:text-[#FFB100] transition-colors">
              Plan Your Trip <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Text Flipping Board Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeInUpVariant}
        custom={0}
        className="w-full bg-[#1B1410] overflow-hidden border-t border-[#FF6A2B]/20"
      >
        <TextFlippingBoardDemo />
      </motion.section>

    </div>
  );
}

