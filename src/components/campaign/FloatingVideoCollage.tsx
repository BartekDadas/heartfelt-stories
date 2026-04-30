import { useEffect, useRef, useState } from "react";

type Tile = {
  src: string;
  poster?: string;
  className: string; // grid placement + size
  rotate: number;
  bobClass: string;
  caption?: string;
};

const SAMPLES = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
];

export function FloatingVideoCollage({
  tiles,
  caption,
  height = "h-[760px] md:h-[680px]",
}: {
  tiles?: Tile[];
  caption?: string;
  height?: string;
}) {
  const flyDirs = ["sp-fly-tl", "sp-fly-tr", "sp-fly-bl", "sp-fly-br", "sp-fly-tl", "sp-fly-tr"];

  const defaultTiles: (Tile & { fly?: string; delay?: number })[] = tiles ?? [
    {
      src: SAMPLES[0],
      className: "col-start-1 col-span-5 row-start-1 row-span-3 md:col-span-4 md:row-span-4",
      rotate: -3,
      bobClass: "sp-bob",
      caption: "9 dni",
    },
    {
      src: SAMPLES[1],
      className: "col-start-7 col-span-6 row-start-1 row-span-2 md:col-span-5 md:row-span-3",
      rotate: 2,
      bobClass: "sp-bob-slow",
      caption: "non-stop stream",
    },
    {
      src: SAMPLES[2],
      className: "col-start-7 col-span-3 row-start-3 row-span-2 md:col-span-3 md:row-span-3",
      rotate: -2,
      bobClass: "sp-bob-fast",
    },
    {
      src: SAMPLES[3],
      className: "col-start-10 col-span-3 row-start-3 row-span-2 md:col-span-3 md:row-span-3",
      rotate: 4,
      bobClass: "sp-bob",
      caption: "razem",
    },
    {
      src: SAMPLES[4],
      className: "col-start-1 col-span-4 row-start-4 row-span-2 md:col-span-3 md:row-span-3",
      rotate: 3,
      bobClass: "sp-bob-slow",
    },
    {
      src: SAMPLES[5],
      className: "col-start-5 col-span-4 row-start-4 row-span-2 md:col-span-3 md:row-span-3",
      rotate: -1,
      bobClass: "sp-bob-fast",
      caption: "dla dzieci",
    },
  ];

  return (
    <section className="relative mx-auto max-w-[1200px] overflow-hidden px-4 py-16 md:py-24">
      {caption && (
        <h2 className="mx-auto mb-10 max-w-2xl text-center text-2xl font-extrabold leading-tight text-white md:text-4xl">
          {caption}
        </h2>
      )}
      <div className={`relative grid grid-cols-12 gap-3 md:gap-5 ${height}`}>
        {defaultTiles.map((t, i) => (
          <FloatingTile
            key={i}
            tile={t}
            flyClass={t.fly ?? flyDirs[i % flyDirs.length]}
            delay={t.delay ?? i * 140}
          />
        ))}
      </div>
    </section>
  );
}

function FloatingTile({
  tile,
  flyClass,
  delay,
}: {
  tile: Tile;
  flyClass: string;
  delay: number;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [flown, setFlown] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFlown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`group relative ${tile.className} ${flown ? `sp-fly ${flyClass} ${tile.bobClass}` : ""}`}
      style={
        {
          ["--rot" as string]: `${tile.rotate}deg`,
          transform: flown ? undefined : "translate3d(0,0,0) scale(0.6)",
          opacity: flown ? undefined : 0,
          animationDelay: `${delay}ms`,
        } as React.CSSProperties
      }
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-black shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
        <video
          ref={ref}
          src={tile.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {tile.caption && (
          <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#7f161c] shadow">
            {tile.caption}
          </div>
        )}
      </div>
    </div>
  );
}
