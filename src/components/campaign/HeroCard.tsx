import { useEffect, useState } from "react";
import { MobileVideoBackground } from "./MobileVideoBackground";

const TARGET = 227803264;
const GOAL = 250000000;

function formatPLN(n: number) {
  return n.toLocaleString("pl-PL").replace(/,/g, " ");
}

export function HeroCard() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * TARGET));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pct = Math.min((value / GOAL) * 100, 100);

  return (
    <div className="relative flex flex-col items-center justify-center pt-10 pb-8 text-center overflow-hidden rounded-2xl md:overflow-visible md:rounded-none">
      <MobileVideoBackground />
      
      <div className="relative z-10 flex w-full flex-col items-center">
        <h1
          className="mb-8 text-5xl font-extrabold leading-tight md:text-7xl"
          style={{
            color: "#ff2a33",
            WebkitTextStroke: "2px #ffffff",
            textShadow: "0 4px 24px rgba(0,0,0,0.45)",
            letterSpacing: "-0.01em",
          }}
        >
          Łatwogang <span style={{ color: "#ffffff", WebkitTextStroke: "0" }}>x</span> Cancer Fighters
        </h1>

        <div className="text-center mb-8 w-full max-w-lg">
          <div className="text-4xl font-extrabold tabular-nums text-[#26c6b6] md:text-6xl">
            {formatPLN(value)} zł
          </div>
          <div className="mt-3 text-base font-semibold text-[#26c6b6]/80">
            Wsparty {formatPLN(Math.floor((value / TARGET) * 3230174))} osoby
          </div>

          {/* Animated progress bar */}
          <div className="mt-6 w-full">
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="sp-shimmer absolute left-0 top-0 h-full rounded-full transition-[width] duration-100 ease-out"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg, #26c6b6, #4caf50)" }}
              />
            </div>
            <div className="mt-2 flex justify-between px-1 text-[11px] font-semibold text-white/60">
              <span>{pct.toFixed(1)}% celu</span>
              <span>cel: {formatPLN(GOAL)} zł</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-4 pt-6">
          <div
            className="h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30"
            style={{
              background: "linear-gradient(135deg, #ffc107, #7f161c)",
            }}
          >
            <div className="flex h-full w-full items-center justify-center text-base font-extrabold text-white">
              Ł
            </div>
          </div>
          <div className="leading-tight text-left">
            <div className="text-[10px] font-bold tracking-[0.18em] text-white/60">ORGANIZATOR:</div>
            <div className="text-sm font-semibold text-white">Łatwogang</div>
          </div>
        </div>
      </div>
    </div>
  );
}
