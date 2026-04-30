import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TARGET = 227803264;
const GOAL = 250000000;

function formatPLN(n: number) {
  return n.toLocaleString("pl-PL").replace(/,/g, " ");
}

export function StatsCard() {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * TARGET));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  const pct = Math.min((value / GOAL) * 100, 100);

  return (
    <aside
      ref={ref}
      className="rounded-2xl border border-white/10 bg-[#1a1416] p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] md:sticky md:top-24"
    >
      <div className="mb-4 flex justify-center">
        <svg width="88" height="96" viewBox="0 0 88 96" fill="none" aria-hidden>
          <rect x="14" y="6" width="60" height="10" rx="3" fill="#4caf50" opacity="0.85" />
          <path
            d="M16 18 H72 V82 a8 8 0 0 1 -8 8 H24 a8 8 0 0 1 -8 -8 Z"
            fill="#0f2a16"
            stroke="#4caf50"
            strokeWidth="2.5"
          />
          <rect x="22" y="40" width="44" height="36" rx="4" fill="#4caf50" opacity="0.25" />
          <text x="44" y="64" textAnchor="middle" fontSize="18" fontWeight="800" fill="#4caf50">
            zł
          </text>
        </svg>
      </div>

      <div className="text-center">
        <div className="text-3xl font-extrabold tabular-nums text-[#26c6b6] md:text-[34px]">
          {formatPLN(value)} zł
        </div>
        <div className="mt-1 text-sm font-semibold text-[#26c6b6]/80">
          Wsparty {formatPLN(Math.floor((value / TARGET) * 3230174))} osoby
        </div>
      </div>

      {/* Animated progress bar */}
      <div className="mt-5">
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="sp-shimmer absolute left-0 top-0 h-full rounded-full transition-[width] duration-100 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] font-semibold text-white/60">
          <span>{pct.toFixed(1)}% celu</span>
          <span>cel: {formatPLN(GOAL)} zł</span>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[13px] leading-relaxed text-white/70">
        <div className="flex gap-2">
          <Info size={16} className="mt-0.5 shrink-0 text-white/40" />
          <p>Wszystkie środki zebrane na skarbonce trafiły bezpośrednio na docelową Organizację:</p>
        </div>
        <a
          href="#"
          className="mt-3 flex items-center gap-2 font-semibold text-[#26c6b6] hover:underline"
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
            style={{ background: "linear-gradient(135deg, #009688, #4caf50)" }}
          >
            CF
          </span>
          Fundacja Cancer Fighters
        </a>
      </div>
    </aside>
  );
}
