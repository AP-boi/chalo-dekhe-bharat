"use client";
import React, { useState, useEffect, useCallback } from "react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

const MESSAGES: string[] = [
  "DISCOVER \nINCREDIBLE \nINDIA",
  "EXPERIENCE \nOUR HERITAGE",
  "EXPLORE \nHIDDEN GEMS",
  "THE JOURNEY \nBEGINS HERE",
  "{O}CHALO DEKHE \nBHARAT!{O}",
];

export default function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    []
  );

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-20 bg-[#1B1410]">
      <TextFlippingBoard text={MESSAGES[msgIdx]} />
    </div>
  );
}
