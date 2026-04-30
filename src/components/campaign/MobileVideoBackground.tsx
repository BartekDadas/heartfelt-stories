import { useState, useEffect, useRef } from "react";

// Weights: video1 has weight 10, video10 has weight 1. Lower number = appears more often.
const VIDEOS = Array.from({ length: 10 }, (_, i) => {
  const num = i + 1;
  const weight = 11 - num;
  return Array(weight).fill(`/assets/video${num}.mp4`);
}).flat();

export function MobileVideoBackground() {
  const [videoA, setVideoA] = useState("");
  const [videoB, setVideoB] = useState("");
  const [active, setActive] = useState<"A" | "B">("A");

  useEffect(() => {
    setVideoA(VIDEOS[Math.floor(Math.random() * VIDEOS.length)]);
  }, []);

  useEffect(() => {
    if (!videoA) return;

    const interval = setInterval(() => {
      // Pick a new video
      let next = VIDEOS[Math.floor(Math.random() * VIDEOS.length)];
      // Try to avoid showing the same video back to back
      const current = active === "A" ? videoA : videoB;
      while (next === current) {
        next = VIDEOS[Math.floor(Math.random() * VIDEOS.length)];
      }

      // Preload next video into the inactive player
      if (active === "A") {
        setVideoB(next);
      } else {
        setVideoA(next);
      }

      // After a short delay to allow the video to start loading, switch active state to trigger CSS transition
      setTimeout(() => {
        setActive((prev) => (prev === "A" ? "B" : "A"));
      }, 100);
      
    }, 5000); // 5s display time

    return () => clearInterval(interval);
  }, [videoA, videoB, active]);

  if (!videoA) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden md:hidden opacity-80">
      <video
        src={videoA}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          active === "A" ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        src={videoB || videoA} // Fallback to avoid empty src error
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          active === "B" ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* A gradient overlay to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b0c]/40 via-[#0d0b0c]/60 to-[#0d0b0c]" />
    </div>
  );
}
