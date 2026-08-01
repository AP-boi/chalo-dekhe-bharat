"use client";

import React, { useState, useEffect } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, Landmark, Camera, Map, Target } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function FloatingDockDemo() {
  const { scrollY } = useScroll();
  const [scrollRange, setScrollRange] = useState({ maxScroll: 0, startHide: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = Math.max(0, docHeight - winHeight);
      // Start sliding down smoothly 260px before the end of the page
      const startHide = Math.max(0, maxScroll - 260);
      setScrollRange({ maxScroll, startHide });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.disconnect();
    };
  }, []);

  // Dynamically translate Y from 0 to 150px as scroll reaches the bottom
  const rawY = useTransform(
    scrollY,
    [scrollRange.startHide, scrollRange.maxScroll],
    [0, 150],
    { clamp: true }
  );

  // Apply spring smoothing for organic, continuous motion
  const smoothY = useSpring(rawY, {
    stiffness: 180,
    damping: 24,
    mass: 0.2,
  });

  const links = [
    {
      title: "Home",
      icon: <Home className="h-full w-full text-[#FF6A2B]" />,
      href: "/",
    },
    {
      title: "Digital Museum",
      icon: <Landmark className="h-full w-full text-[#FF6A2B]" />,
      href: "/museum",
    },
    {
      title: "Gallery",
      icon: <Camera className="h-full w-full text-[#FF6A2B]" />,
      href: "/gallery",
    },
    {
      title: "Travel Planner",
      icon: <Map className="h-full w-full text-[#FF6A2B]" />,
      href: "/planner",
    },
    {
      title: "Mini-Game",
      icon: <Target className="h-full w-full text-[#FF6A2B]" />,
      href: "/game",
    },
  ];

  return (
    <motion.div
      className="fixed bottom-6 sm:bottom-8 left-1/2 z-50 pointer-events-auto"
      style={{
        y: smoothY,
        x: "-50%",
      }}
    >
      <FloatingDock
        mobileClassName="translate-y-0"
        items={links}
      />
    </motion.div>
  );
}
