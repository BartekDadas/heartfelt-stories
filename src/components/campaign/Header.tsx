import { Search, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const navLinks = ["Zbiórki", "Podopieczni", "Organizacje", "Kampanie"];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 md:px-6">
        <a href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
          <span style={{ color: "#7f161c" }}>sie</span>
          <span style={{ color: "#ffc107" }} className="-ml-2">po</span>
          <span style={{ color: "#4caf50" }} className="-ml-2">ma</span>
          <span style={{ color: "#009688" }} className="-ml-2">ga</span>
          <span className="-ml-2 text-gray-500">.pl</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l}
              href="#"
              className="text-[15px] font-semibold text-[#333] transition-colors hover:text-[#009688]"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border-2 border-[#009688] px-3 py-1 text-sm font-bold text-[#009688] md:inline-block">
            1,5%
          </span>
          <button
            className="hidden rounded-full bg-[#009688] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#00796b] sm:inline-block"
            type="button"
          >
            Załóż...
          </button>
          <button aria-label="Szukaj" className="rounded-full p-2 text-[#333] hover:bg-gray-100" type="button">
            <Search size={20} />
          </button>
          <button
            aria-label="Menu"
            className="rounded-full p-2 text-[#333] hover:bg-gray-100 lg:hidden"
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l}>
                <a href="#" className="block py-1 text-[15px] font-semibold text-[#333]">
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
