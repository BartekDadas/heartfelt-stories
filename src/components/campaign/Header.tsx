export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-end px-4 py-4 md:px-6 pointer-events-none">
      <a
        href="https://www.siepomaga.pl/latwogang"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto rounded-full bg-[#4caf50] px-8 py-3 text-sm font-extrabold tracking-wide text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#43a047]"
      >
        Wrzuć datek
      </a>
    </header>
  );
}
