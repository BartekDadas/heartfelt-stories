import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.07.44.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.07.51.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.08.01.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.08.12.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.08.21.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.08.28.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.08.41.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.08.47.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.08.53.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.09.02.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.09.09.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.09.17.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.09.26.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.09.33.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.09.40.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.09.49.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.09.59.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.10.15.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.10.31.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.10.36.png",
  "/assets/images/Zrzut ekranu 2026-04-30 o 19.10.42.png",
];

function RandomSlideshow() {
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");
  const [active, setActive] = useState<"A" | "B">("A");

  useEffect(() => {
    setImageA(IMAGES[Math.floor(Math.random() * IMAGES.length)]);
  }, []);

  useEffect(() => {
    if (!imageA) return;

    const interval = setInterval(() => {
      let next = IMAGES[Math.floor(Math.random() * IMAGES.length)];
      const current = active === "A" ? imageA : imageB;
      while (next === current) {
        next = IMAGES[Math.floor(Math.random() * IMAGES.length)];
      }

      if (active === "A") {
        setImageB(next);
      } else {
        setImageA(next);
      }

      setTimeout(() => {
        setActive((prev) => (prev === "A" ? "B" : "A"));
      }, 100);
    }, 3000); // Change image every 3s

    return () => clearInterval(interval);
  }, [imageA, imageB, active]);

  if (!imageA) return null;

  return (
    <>
      <img
        src={imageA}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          active === "A" ? "opacity-90" : "opacity-0"
        }`}
      />
      <img
        src={imageB || imageA}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          active === "B" ? "opacity-90" : "opacity-0"
        }`}
      />
    </>
  );
}

export function ScrollScrubVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Story lines fade based on progress
  const lines = [
    { text: "Każda złotówka", at: 0.2 },
    { text: "Dla nich.", at: 0.7 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "200vh" }}
      aria-label="Cinematic story"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <RandomSlideshow />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(127,22,28,0.4) 60%, rgba(0,0,0,0.8) 100%)",
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
                  textShadow: "0 4px 30px rgba(0,0,0,0.8)",
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
