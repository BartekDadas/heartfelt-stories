export function DescriptionCard() {
  return (
    <article className="rounded-2xl bg-white p-7 shadow-md md:p-9">
      <h3 className="mb-4 text-xl font-extrabold text-[#333]">O zbiórce</h3>
      <p className="text-[15px] leading-relaxed text-gray-700">
        Słucham 9 dni dissu na raka żeby pomóc dzieciom z Fundacji Cancer Fighters. Każda
        złotówka zebrana na stream idzie na Fundację Cancer Fighters.
      </p>
      <div className="mt-6 rounded-xl border border-[#009688]/20 bg-[#009688]/5 p-4 text-sm text-[#333]">
        Skarbonka została zakończona. Dziękujemy, że byliście{" "}
        <a href="#" className="font-semibold text-[#009688] hover:underline">
          z nami
        </a>
        .
      </div>
    </article>
  );
}
