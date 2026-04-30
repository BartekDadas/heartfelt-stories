import { Info } from "lucide-react";

export function StatsCard() {
  return (
    <aside className="rounded-2xl bg-white p-6 shadow-md md:sticky md:top-24">
      <div className="mb-4 flex justify-center">
        {/* Jar SVG */}
        <svg width="88" height="96" viewBox="0 0 88 96" fill="none" aria-hidden>
          <rect x="14" y="6" width="60" height="10" rx="3" fill="#4caf50" opacity="0.85" />
          <path
            d="M16 18 H72 V82 a8 8 0 0 1 -8 8 H24 a8 8 0 0 1 -8 -8 Z"
            fill="#e8f5e9"
            stroke="#4caf50"
            strokeWidth="2.5"
          />
          <rect x="22" y="40" width="44" height="36" rx="4" fill="#4caf50" opacity="0.18" />
          <text x="44" y="64" textAnchor="middle" fontSize="18" fontWeight="800" fill="#2e7d32">
            zł
          </text>
        </svg>
      </div>

      <div className="text-center">
        <div className="text-3xl font-extrabold text-[#009688] md:text-[34px]">227 803 264 zł</div>
        <div className="mt-1 text-sm font-semibold text-[#009688]/80">Wsparty 3 230 174 osoby</div>
      </div>

      <div className="mt-5 rounded-xl border border-gray-200 p-4 text-[13px] leading-relaxed text-gray-600">
        <div className="flex gap-2">
          <Info size={16} className="mt-0.5 shrink-0 text-gray-400" />
          <p>
            Wszystkie środki zebrane na skarbonce trafiły bezpośrednio na docelową Organizację:
          </p>
        </div>
        <a
          href="#"
          className="mt-3 flex items-center gap-2 font-semibold text-[#009688] hover:underline"
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
