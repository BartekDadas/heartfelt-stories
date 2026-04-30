export function DescriptionCard() {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#1a1416] p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] md:p-9">
      <h3 className="mb-4 text-xl font-extrabold text-white">O zbiórce</h3>
      <p className="text-[15px] leading-relaxed text-white/75">
        Słucham 9 dni dissu na raka żeby pomóc dzieciom z Fundacji Cancer Fighters. Każda
        złotówka zebrana na stream idzie na Fundację Cancer Fighters.
      </p>
      <div className="mt-6">
        <a
          href="https://dissnaraka.cancerfighters.pl/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl border border-[#26c6b6]/30 bg-[#26c6b6]/10 px-6 py-3 text-sm font-semibold text-[#26c6b6] transition-colors hover:bg-[#26c6b6]/20"
        >
          Dowiedz się więcej
        </a>
      </div>
    </article>
  );
}
