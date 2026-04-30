import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/campaign/Header";
import { HeroCard } from "@/components/campaign/HeroCard";
import { useState } from "react";

import { FloatingVideoCollage, getUniqueRandomThumbnails } from "@/components/campaign/FloatingVideoCollage";
import { ScrollScrubVideo } from "@/components/campaign/ScrollScrubVideo";
import { DescriptionCard } from "@/components/campaign/DescriptionCard";
import { CommentsSkeleton } from "@/components/campaign/CommentsSkeleton";
import { Footer } from "@/components/campaign/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [secondCollageThumbs] = useState(() => getUniqueRandomThumbnails(3));

  return (
    <div className="min-h-screen bg-[#0d0b0c] text-white">
      <Header />

      <main>
        {/* Hero + Stats */}
        <section className="mx-auto max-w-[1200px] px-4 pb-10 pt-8 md:px-6 md:pt-12">
          <HeroCard />
        </section>

        {/* Storytelling beat 1 — floating collage */}
        <FloatingVideoCollage caption="9 dni dissu na raka. Tysiące osób. Jeden cel." />

        {/* Cinematic scroll-scrub video */}
        <ScrollScrubVideo />

        {/* Description */}
        <section className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <div className="md:col-span-2">
              <DescriptionCard />
            </div>
            <div className="md:col-span-1">
              <div className="rounded-2xl border border-white/10 bg-[#1a1416] p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]">
                <h4 className="mb-2 text-sm font-extrabold uppercase tracking-wider text-[#ff2a33]">
                  Dziękujemy
                </h4>
                <p className="text-sm leading-relaxed text-white/70">
                  Razem zebraliście rekordową kwotę. Każda osoba, która wsparła zbiórkę, dała dzieciom
                  z Fundacji Cancer Fighters realną szansę.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Storytelling beat 2 — second collage */}
        <FloatingVideoCollage
          height="h-[520px] md:h-[440px]"
          tiles={[
            {
              src: secondCollageThumbs[0],
              className: "col-start-1 col-span-6 row-start-1 row-span-3 md:col-span-5 md:row-span-3",
              rotate: -2,
              bobClass: "sp-bob-slow",
              caption: "Dziękujemy",
            },
            {
              src: secondCollageThumbs[1],
              className: "col-start-7 col-span-6 row-start-1 row-span-2 md:col-span-4 md:row-span-2",
              rotate: 3,
              bobClass: "sp-bob",
            },
            {
              src: secondCollageThumbs[2],
              className: "col-start-9 col-span-4 row-start-3 row-span-2 md:col-start-9 md:col-span-4 md:row-span-2",
              rotate: -3,
              bobClass: "sp-bob-fast",
              caption: "razem #CancerFighters",
            },
          ]}
        />

        {/* Comments */}
        <section className="mx-auto max-w-[1200px] px-4 pb-16 md:px-6">
          <CommentsSkeleton />
        </section>
      </main>

      <Footer />
    </div>
  );
}
