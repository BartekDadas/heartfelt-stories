import { useEffect, useRef, useState } from "react";

type Tile = {
  src: string;
  poster?: string;
  className: string; // grid placement + size
  rotate: number;
  bobClass: string;
  caption?: string;
};

export const THUMBNAILS = [
  "/assets/thumbnails/671286511_1503399001388611_99735412691085452_n.jpg",
  "/assets/thumbnails/675446147_2557736034662349_7894225726049453724_n.jpg",
  "/assets/thumbnails/End_Frame.jpg",
  "/assets/thumbnails/Thumbnail (1).jpg",
  "/assets/thumbnails/Thumbnail.jpg",
  "/assets/thumbnails/oardefault.jpg",
  "/assets/thumbnails/thumbnails.webp"
];

export function getUniqueRandomThumbnails(count: number) {
  const shuffled = [...THUMBNAILS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

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

  // Use useState to keep random thumbnails consistent after hydration
  const [defaultTiles] = useState<(Tile & { fly?: string; delay?: number })[]>(() => {
    if (tiles) return tiles;
    const uniqueThumbs = getUniqueRandomThumbnails(6);
    return [
      {
        src: uniqueThumbs[0],
        className: "col-start-1 col-span-5 row-start-1 row-span-3 md:col-span-4 md:row-span-4",
        rotate: -3,
        bobClass: "sp-bob",
        caption: "9 dni",
      },
      {
        src: uniqueThumbs[1],
        className: "col-start-7 col-span-6 row-start-1 row-span-2 md:col-span-5 md:row-span-3",
        rotate: 2,
        bobClass: "sp-bob-slow",
        caption: "non-stop stream",
      },
      {
        src: uniqueThumbs[2],
        className: "col-start-7 col-span-3 row-start-3 row-span-2 md:col-span-3 md:row-span-3",
        rotate: -2,
        bobClass: "sp-bob-fast",
      },
      {
        src: uniqueThumbs[3],
        className: "col-start-10 col-span-3 row-start-3 row-span-2 md:col-span-3 md:row-span-3",
        rotate: 4,
        bobClass: "sp-bob",
        caption: "razem",
      },
      {
        src: uniqueThumbs[4],
        className: "col-start-1 col-span-4 row-start-4 row-span-2 md:col-span-3 md:row-span-3",
        rotate: 3,
        bobClass: "sp-bob-slow",
      },
      {
        src: uniqueThumbs[5],
        className: "col-start-5 col-span-4 row-start-4 row-span-2 md:col-span-3 md:row-span-3",
        rotate: -1,
        bobClass: "sp-bob-fast",
        caption: "dla dzieci",
      },
    ];
  });

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

  const isVideo = tile.src.endsWith(".mp4") || tile.src.endsWith(".webm");

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
        {isVideo ? (
          <video
            ref={ref}
            src={tile.src}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <img src={tile.src} alt="" className="h-full w-full object-cover" />
        )}
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
