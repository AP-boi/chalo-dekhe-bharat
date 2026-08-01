"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Landmark, Image, MapPin, Gamepad2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Compass },
  { name: "Digital Museum", href: "/museum", icon: Landmark },
  { name: "Gallery", href: "/gallery", icon: Image },
  { name: "AI Planner", href: "/planner", icon: MapPin },
  { name: "Landmark Quiz", href: "/game", icon: Gamepad2 },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-8">
      <nav className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-full px-5 py-2.5 shadow-2xl">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8b1a1a] via-[#f5a623] to-[#00796b] flex items-center justify-center p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#1a1040] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#f5a623]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-none tracking-wider gold-gradient-text">
              CHALO DEKHE BHARAT
            </span>
            <span className="text-[10px] text-amber-200/70 tracking-widest uppercase">
              Immersive Tourism Portal
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "text-amber-300 font-semibold bg-[#8b1a1a]/40 border border-amber-500/40 shadow-inner"
                    : "text-stone-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#f5a623]" : "text-stone-400"}`} />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 rounded-full border border-[#f5a623]/50 bg-[#f5a623]/10 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.name}
                className={`p-2 rounded-full transition-all ${
                  isActive
                    ? "bg-[#8b1a1a] text-amber-300 border border-amber-500/50"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
