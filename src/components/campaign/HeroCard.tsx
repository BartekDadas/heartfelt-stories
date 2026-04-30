import { PiggyBank, Star } from "lucide-react";

export function HeroCard() {
  return (
    <article
      className="relative overflow-hidden rounded-2xl p-7 text-white shadow-lg md:p-10"
      style={{
        background: "linear-gradient(135deg, #7f161c 0%, #551a20 100%)",
        minHeight: "420px",
      }}
    >
      {/* Faint stars */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[
          { top: "10%", right: "8%", size: 28, op: 0.18 },
          { top: "30%", right: "22%", size: 18, op: 0.12 },
          { top: "55%", right: "10%", size: 36, op: 0.15 },
          { top: "75%", right: "28%", size: 20, op: 0.1 },
          { top: "20%", right: "40%", size: 14, op: 0.1 },
          { top: "65%", right: "45%", size: 22, op: 0.08 },
        ].map((s, i) => (
          <Star
            key={i}
            className="absolute text-white"
            style={{ top: s.top, right: s.right, opacity: s.op }}
            size={s.size}
            strokeWidth={1.2}
            fill="none"
          />
        ))}
      </div>

      {/* Status badge */}
      <div
        className="absolute right-5 top-5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur-md"
        style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        Skarbonka zakończona
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-8 flex items-center gap-2 text-white/85">
          <PiggyBank size={22} strokeWidth={2} />
          <span className="text-xs font-bold tracking-[0.2em]">SKARBONKA</span>
        </div>

        <h1
          className="mb-10 text-4xl font-extrabold leading-tight md:text-6xl"
          style={{
            color: "#ff2a33",
            WebkitTextStroke: "2px #ffffff",
            textShadow: "0 4px 24px rgba(0,0,0,0.45)",
            letterSpacing: "-0.01em",
          }}
        >
          Łatwogang <span style={{ color: "#ffffff", WebkitTextStroke: "0" }}>x</span> Cancer Fighters
        </h1>

        <div className="mt-auto flex items-center gap-4 border-t border-white/15 pt-6">
          <div
            className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30"
            style={{
              background: "linear-gradient(135deg, #ffc107, #7f161c)",
            }}
          >
            <div className="flex h-full w-full items-center justify-center text-lg font-extrabold text-white">
              Ł
            </div>
          </div>
          <div className="leading-tight">
            <div className="text-[10px] font-bold tracking-[0.18em] text-white/60">ORGANIZATOR:</div>
            <div className="text-base font-semibold text-white">Łatwogang</div>
          </div>
        </div>
      </div>
    </article>
  );
}
