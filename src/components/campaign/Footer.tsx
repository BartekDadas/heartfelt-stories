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
    <footer className="mt-20 bg-[#efeee9] text-[#333]">
      <div className="border-b border-black/5">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <div className="flex items-center gap-4">
            <span className="rounded-full border-2 border-[#009688] px-3 py-1 text-sm font-bold text-[#009688]">
              1,5%
            </span>
            <div>
              <div className="text-sm font-bold">Przekaż 1,5% podatku</div>
              <div className="text-xs text-gray-600">Fundacja Siepomaga · KRS: 0000396361</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <span style={{ color: "#7f161c" }}>sie</span>
            <span style={{ color: "#ffc107" }} className="-ml-1.5">po</span>
            <span style={{ color: "#4caf50" }} className="-ml-1.5">ma</span>
            <span style={{ color: "#009688" }} className="-ml-1.5">ga</span>
            <span className="-ml-1.5 text-gray-500">.pl</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        {columns.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-[#333]">
              {c.title}
            </h4>
            <ul className="space-y-2.5">
              {c.items.map((it) => (
                <li key={it}>
                  <a href="#" className="text-sm text-gray-600 hover:text-[#009688]">
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-black/5">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 px-4 py-6 md:flex-row md:px-6">
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="rounded-full bg-white p-2 text-[#333] shadow-sm hover:text-[#009688]"
                aria-label="Social link"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <a href="#" className="text-sm font-semibold text-[#009688] hover:underline">
            Switch to English
          </a>
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm">
            <ShieldCheck size={14} className="text-[#4caf50]" />
            Bezpieczne płatności PayU
          </div>
        </div>
      </div>
    </footer>
  );
}
