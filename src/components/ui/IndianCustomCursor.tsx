"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function IndianCustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Exact pointer coordinates for 0-latency tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Lightweight spring physics for outer trailing aura ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only activate cursor on desktop pointer devices with fine pointer control
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = !!target.closest(
        'a, button, input, textarea, select, [role="button"], .interactive, [data-cursor-hover]'
      );
      setIsHovered(interactive);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Smooth Trailing Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[#FF6A2B]/70 shadow-[0_0_14px_rgba(255,106,43,0.35)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 38 : isClicked ? 18 : 26,
          height: isHovered ? 38 : isClicked ? 18 : 26,
          backgroundColor: isHovered ? "rgba(255, 106, 43, 0.12)" : "transparent",
          borderColor: isHovered ? "#FFB100" : "rgba(255, 106, 43, 0.65)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
      />

      {/* Center Precision Glowing Saffron Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-gradient-to-r from-[#FF6A2B] to-[#FFB100] shadow-[0_0_10px_#FF6A2B]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 8 : isClicked ? 4 : 6,
          height: isHovered ? 8 : isClicked ? 4 : 6,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </>
  );
}
