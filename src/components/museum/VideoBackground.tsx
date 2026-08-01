"use client";

import { useState, useEffect, useRef } from "react";
import { Film } from "lucide-react";

interface VideoBackgroundProps {
  videoFileName: string;
  eraTitle: string;
  themeColor: string;
}

export default function VideoBackground({ videoFileName, eraTitle, themeColor }: VideoBackgroundProps) {
  // Support both /videoFileName and /videos/videoFileName
  const [currentSrc, setCurrentSrc] = useState<string>(`/${videoFileName}`);
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [triedFallbackPath, setTriedFallbackPath] = useState<boolean>(false);

  const videoRef0 = useRef<HTMLVideoElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const primarySrc = `/${videoFileName}`;
    if (primarySrc === currentSrc && !videoError) return;

    setVideoError(false);
    setTriedFallbackPath(false);
    
    if (activeSlot === 0) {
      setPrevSrc(currentSrc);
      setCurrentSrc(primarySrc);
      setActiveSlot(1);
    } else {
      setPrevSrc(currentSrc);
      setCurrentSrc(primarySrc);
      setActiveSlot(0);
    }
  }, [videoFileName]);

  const handleVideoError = () => {
    // If /museum-indus.mp4 failed, try /videos/museum-indus.mp4
    if (!triedFallbackPath) {
      setTriedFallbackPath(true);
      setCurrentSrc(`/videos/${videoFileName}`);
    } else {
      setVideoError(true);
    }
  };

  const handleVideoSuccess = () => {
    setVideoError(false);
  };

  useEffect(() => {
    const activeVideo = activeSlot === 0 ? videoRef0.current : videoRef1.current;
    if (activeVideo) {
      activeVideo.play().catch((err) => {
        console.warn("Autoplay deferred:", err);
      });
    }
  }, [currentSrc, activeSlot]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#070414]">
      {/* HTML5 Video Layer 0 */}
      <video
        ref={videoRef0}
        src={activeSlot === 0 ? currentSrc : prevSrc || undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleVideoSuccess}
        onCanPlay={handleVideoSuccess}
        onError={handleVideoError}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          activeSlot === 0 && !videoError ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      />

      {/* HTML5 Video Layer 1 */}
      <video
        ref={videoRef1}
        src={activeSlot === 1 ? currentSrc : prevSrc || undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleVideoSuccess}
        onCanPlay={handleVideoSuccess}
        onError={handleVideoError}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          activeSlot === 1 && !videoError ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      />

      {/* Ambient Animated Fallback Container when video file is missing */}
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-br ${themeColor} transition-opacity duration-700 ${
          videoError ? "opacity-100 z-20" : "opacity-40 z-20 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-stone-950/60 to-black/90 animate-pulse" />
        
        {videoError && (
          <div className="absolute bottom-20 left-6 z-30 max-w-sm p-3.5 rounded-2xl glass-panel-gold border border-amber-500/40 text-amber-200 text-xs shadow-2xl flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white mb-0.5">Video Prompt Ready</p>
              <p className="text-[11px] text-amber-200/80 leading-tight">
                Generate <code className="px-1 py-0.5 rounded bg-black/60 font-mono text-amber-300">public/{videoFileName}</code> using prompts in <code className="px-1 py-0.5 rounded bg-black/60 font-mono text-amber-300">AI_VIDEO_PROMPTS.md</code>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Dark Vignette Overlay for readable UI readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070414] via-transparent to-[#070414]/70 z-20 pointer-events-none" />
    </div>
  );
}

