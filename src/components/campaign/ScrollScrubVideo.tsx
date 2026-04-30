import { useEffect, useRef, useState } from "react";

const SCRUB_SRC =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

export function ScrollScrubVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let duration = 0;
    const handleMeta = () => {
      duration = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", handleMeta);
    if (video.readyState >= 1) handleMeta();

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when section top hits viewport top, 1 when section bottom hits viewport bottom
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      if (duration > 0) {
        targetTimeRef.current = p * (duration - 0.05);
      }
    };

    const tick = () => {
      const v = videoRef.current;
      if (v && duration > 0) {
        const current = v.currentTime;
        const target = targetTimeRef.current;
        const diff = target - current;
        if (Math.abs(diff) > 0.03) {
          v.currentTime = current + diff * 0.18;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", handleMeta);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Story lines fade based on progress
  const lines = [
    { text: "Każda sekunda", at: 0.15 },
    { text: "Każda złotówka", at: 0.5 },
    { text: "Dla nich.", at: 0.85 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "220vh" }}
      aria-label="Cinematic story"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={SCRUB_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(127,22,28,0.35) 60%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {lines.map((l, i) => {
            const dist = Math.abs(progress - l.at);
            const opacity = Math.max(0, 1 - dist * 4);
            const y = (progress - l.at) * 80;
            return (
              <h2
                key={i}
                className="absolute font-extrabold text-white"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 7rem)",
                  letterSpacing: "-0.02em",
                  opacity,
                  transform: `translateY(${y}px)`,
                  textShadow: "0 4px 30px rgba(0,0,0,0.6)",
                }}
              >
                {l.text}
              </h2>
            );
          })}

          {/* Scroll progress bar */}
          <div className="absolute bottom-10 left-1/2 h-1 w-48 -translate-x-1/2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-white"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
