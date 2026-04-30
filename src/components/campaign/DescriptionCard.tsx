export function DescriptionCard() {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#1a1416] p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] md:p-9">
      <h3 className="mb-4 text-xl font-extrabold text-white">O zbiórce</h3>
      <p className="text-[15px] leading-relaxed text-white/75">
        Słucham 9 dni dissu na raka żeby pomóc dzieciom z Fundacji Cancer Fighters. Każda
        złotówka zebrana na stream idzie na Fundację Cancer Fighters.
      </p>
      <div className="mt-6 rounded-xl border border-[#26c6b6]/30 bg-[#26c6b6]/10 p-4 text-sm text-white/85">
        Skarbonka została zakończona. Dziękujemy, że byliście{" "}
        <a href="#" className="font-semibold text-[#26c6b6] hover:underline">
          z nami
        </a>
        .
      </div>
    </article>
  );
}
