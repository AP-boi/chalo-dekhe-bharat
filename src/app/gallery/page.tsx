'use client';

import InfiniteGallery, { ImageItem } from "@/components/ui/3d-gallery-photography";

const INDIAN_HERITAGE_IMAGES: ImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop",
    alt: "Taj Mahal Agra",
  },
  {
    src: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop",
    alt: "Varanasi Ganges Ghats",
  },
  {
    src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop",
    alt: "Hawa Mahal Jaipur",
  },
  {
    src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&auto=format&fit=crop",
    alt: "Golden Temple Amritsar",
  },
  {
    src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop",
    alt: "Qutub Minar Delhi",
  },
  {
    src: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop",
    alt: "Gateway of India Mumbai",
  },
  {
    src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop",
    alt: "Kerala Houseboat Backwaters",
  },
  {
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop",
    alt: "Indian Culture & Heritage",
  },
];

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#1B1410] overflow-hidden select-none">
      {/* 3D Infinite Gallery */}
      <InfiniteGallery
        images={INDIAN_HERITAGE_IMAGES}
        speed={1.2}
        zSpacing={3}
        visibleCount={8}
        falloff={{ near: 0.8, far: 14 }}
        className="h-screen w-full overflow-hidden"
      />

      {/* Floating Center Overlay Headline */}
      <div className="h-screen inset-0 pointer-events-none fixed flex flex-col items-center justify-center text-center px-4 mix-blend-difference text-[#FFF6E9] z-20">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FFB100] mb-2">
          Visual Symphony of Bharat
        </span>
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl tracking-tight uppercase leading-none">
          TIMELINES & LANDSCAPES
        </h1>
      </div>

      {/* Bottom Controls Info Bar */}
      <div className="text-center fixed bottom-12 left-0 right-0 font-body uppercase text-[11px] font-semibold text-[#FFF6E9]/80 z-30 pointer-events-none">
        <p className="tracking-wider">Use mouse wheel, arrow keys, or touch to navigate</p>
        <p className="text-[#FFB100]/70 text-[10px] mt-0.5">Auto-play resumes after 3 seconds of inactivity</p>
      </div>
    </main>
  );
}
