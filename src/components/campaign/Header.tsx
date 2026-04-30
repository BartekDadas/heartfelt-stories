import { Search, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const navLinks = ["Zbiórki", "Podopieczni", "Organizacje", "Kampanie"];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#120f10]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 md:px-6">
        <a
          href="/"
          className="text-2xl font-extrabold tracking-tight"
          style={{
            color: "#ff2a33",
            WebkitTextStroke: "1.5px #ffffff",
            letterSpacing: "0.01em",
          }}
        >
          siepomaga<span style={{ color: "#ffffff", WebkitTextStroke: "0" }}>.pl</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l}
              href="#"
              className="text-[15px] font-semibold text-white/80 transition-colors hover:text-[#26c6b6]"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border-2 border-[#26c6b6] px-3 py-1 text-sm font-bold text-[#26c6b6] md:inline-block">
            1,5%
          </span>
          <button
            className="hidden rounded-full bg-[#009688] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#00796b] sm:inline-block"
            type="button"
          >
            Załóż...
          </button>
          <button aria-label="Szukaj" className="rounded-full p-2 text-white/80 hover:bg-white/10" type="button">
            <Search size={20} />
          </button>
          <button
            aria-label="Menu"
            className="rounded-full p-2 text-white/80 hover:bg-white/10 lg:hidden"
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#120f10] px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l}>
                <a href="#" className="block py-1 text-[15px] font-semibold text-white/85">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
