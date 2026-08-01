"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue, useSpring } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 0.95] : [0.9, 1.02, 1.0];
  };

  const rotate = useTransform(smoothProgress, [0.1, 0.5, 0.9], [24, 0, -4]);
  const scale = useTransform(smoothProgress, [0.1, 0.5, 0.9], scaleDimensions());
  const translate = useTransform(smoothProgress, [0.1, 0.5], [60, -30]);
  const opacity = useTransform(smoothProgress, [0.05, 0.2, 0.85, 0.98], [0.3, 1, 1, 0.7]);
  const shineTranslate = useTransform(smoothProgress, [0.1, 0.8], ["-100%", "200%"]);

  return (
    <div
      className="h-[55rem] md:h-[75rem] flex items-center justify-center relative p-2 md:p-12 overflow-hidden bg-gradient-to-b from-[#1B1410] via-[#140E0A] to-[#1B1410]"
      ref={containerRef}
    >
      {/* Ambient background glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6A2B]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFB100]/10 rounded-full blur-[100px] pointer-events-none" />

      <div
        className="py-10 md:py-24 w-full relative z-10"
        style={{
          perspective: "1200px",
        }}
      >
        <Header translate={translate} opacity={opacity} titleComponent={titleComponent} />
        <Card
          rotate={rotate}
          scale={scale}
          shineTranslate={shineTranslate}
          opacity={opacity}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  opacity,
  titleComponent,
}: {
  translate: MotionValue<number>;
  opacity: MotionValue<number>;
  titleComponent: any;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        opacity,
      }}
      className="max-w-5xl mx-auto text-center relative z-20 mb-8 md:mb-12"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  opacity,
  shineTranslate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  shineTranslate: MotionValue<string>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        opacity,
        boxShadow:
          "0 20px 80px -15px rgba(255, 106, 43, 0.3), 0 0 40px 0 rgba(255, 177, 0, 0.15), 0 35px 50px -15px rgba(0, 0, 0, 0.7)",
      }}
      className="max-w-6xl -mt-6 md:-mt-10 mx-auto h-[28rem] md:h-[42rem] w-full border-2 border-[#FF6A2B]/40 p-2 md:p-5 bg-[#2A1F19]/90 backdrop-blur-xl rounded-[28px] md:rounded-[36px] shadow-2xl relative overflow-hidden group transition-colors duration-500 hover:border-[#FFB100]/60"
    >
      {/* Light sheen sweep animation across card on scroll */}
      <motion.div
        style={{
          x: shineTranslate,
        }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none z-20"
      />

      <div className="h-full w-full overflow-hidden rounded-[20px] md:rounded-[28px] bg-[#140E0A] border border-[#FF6A2B]/20 relative">
        {children}
      </div>
    </motion.div>
  );
};

