"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-3 flex flex-col gap-2.5 items-center"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.04,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.04 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  className="relative flex h-11 px-4 items-center justify-center gap-2.5 rounded-full bg-[#1B1410]/95 backdrop-blur-xl border border-[#FF6A2B]/40 shadow-xl"
                >
                  <div
                    className="absolute inset-0 isolate -z-10 h-full w-full rounded-full"
                    style={{ backdropFilter: 'url("#container-glass")' }}
                  />
                  <div className="h-4 w-4 text-[#FF6A2B] shrink-0 z-10">{item.icon}</div>
                  <span className="text-xs font-bold text-[#FFB100] tracking-wide whitespace-nowrap z-10">{item.title}</span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-transparent border border-[#FF6A2B]/40 shadow-xl cursor-pointer overflow-hidden"
      >
        <div
          className="absolute inset-0 isolate -z-10 h-full w-full rounded-full"
          style={{ backdropFilter: 'url("#container-glass")' }}
        />
        <div className="absolute inset-0 rounded-full shadow-[inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6)]" />
        <Menu className="h-6 w-6 text-[#FF6A2B] z-10" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "relative mx-auto hidden h-20 items-center gap-4 rounded-full px-6 py-3 md:flex transition-all duration-300",
        "shadow-[0_0_8px_rgba(0,0,0,0.03),0_4px_20px_rgba(0,0,0,0.4),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.2),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),0_0_15px_rgba(255,106,43,0.2)]",
        className
      )}
    >
      {/* Liquid Glass Background & Filter */}
      <div
        className="absolute inset-0 isolate -z-10 h-full w-full overflow-hidden rounded-full border border-[#FF6A2B]/30"
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
      <div className="absolute inset-0 z-0 rounded-full shadow-[inset_0_0_8px_4px_rgba(255,255,255,0.1)] pointer-events-none" />

      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [44, 84, 44]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [44, 84, 44]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [22, 42, 22]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [22, 42, 22]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 160,
    damping: 14,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} className="relative group/dock-item">
      {/* Floating Tooltip Label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-12 left-1/2 w-fit rounded-lg bg-[#1B1410]/95 backdrop-blur-md border border-[#FF6A2B] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider whitespace-nowrap text-[#FFB100] shadow-[0_10px_25px_rgba(0,0,0,0.8)] z-50 pointer-events-none"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-transparent transition-all cursor-pointer group/icon"
      >
        {/* Inner Liquid Glass Specular Shadow */}
        <div className="absolute inset-0 rounded-full overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_2px_2px_0.5px_-2px_rgba(255,255,255,0.4),inset_-2px_-2px_0.5px_-2px_rgba(255,255,255,0.7),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.5),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.5)] transition-all group-hover/icon:border group-hover/icon:border-[#FF6A2B]" />

        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center z-10"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}



