import { Facebook, Instagram, Youtube, Twitter, ShieldCheck } from "lucide-react";

const columns: { title: string; items: string[] }[] = [
  {
    title: "Fundacja Siepomaga",
    items: [
      "Przekaż 1,5% podatku",
      "Regulamin własności intelektualnej",
      "Statut",
      "Profil",
      "Inspektor ochrony danych",
      "Kontakt",
    ],
  },
  {
    title: "Siepomaga.pl",
    items: [
      "Jak działa?",
      "Regulamin",
      "Blog",
      "Polityka prywatności",
      "Zarządzaj zgodami cookies",
      "Potwierdzenie darowizn",
      "Wspieraj przez SMS",
      "Kariera",
    ],
  },
  {
    title: "Wspieraj",
    items: [
      "Załóż konto Pomagacza",
      "Załóż konto firmowe",
      "Zbiórki",
      "Podopieczni",
      "Organizacje",
      "Kampanie",
      "Dla Firm",
      "Aplikacja Datkomat",
    ],
  },
  {
    title: "Zbieraj",
    items: ["Załóż zbiórkę", "Załóż subkonto", "Dodaj Organizację", "Zbieraj 1,5% podatku"],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0a0809] text-white/80">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <div className="flex items-center gap-4">
            <span className="rounded-full border-2 border-[#26c6b6] px-3 py-1 text-sm font-bold text-[#26c6b6]">
              1,5%
            </span>
            <div>
              <div className="text-sm font-bold text-white">Przekaż 1,5% podatku</div>
              <div className="text-xs text-white/50">Fundacja Siepomaga · KRS: 0000396361</div>
            </div>
          </div>
          <div
            className="text-lg font-extrabold tracking-tight"
            style={{ color: "#ff2a33", WebkitTextStroke: "1px #ffffff" }}
          >
            siepomaga<span style={{ color: "#ffffff", WebkitTextStroke: "0" }}>.pl</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        {columns.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-white">
              {c.title}
            </h4>
            <ul className="space-y-2.5">
              {c.items.map((it) => (
                <li key={it}>
                  <a href="#" className="text-sm text-white/60 hover:text-[#26c6b6]">
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 px-4 py-6 md:flex-row md:px-6">
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="rounded-full bg-white/5 p-2 text-white/70 hover:text-[#26c6b6]"
                aria-label="Social link"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <a href="#" className="text-sm font-semibold text-[#26c6b6] hover:underline">
            Switch to English
          </a>
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70">
            <ShieldCheck size={14} className="text-[#4caf50]" />
            Bezpieczne płatności PayU
          </div>
        </div>
      </div>
    </footer>
  );
}
