import { useEffect, useRef } from "react";

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
  const defaultTiles: Tile[] = tiles ?? [
    {
      src: SAMPLES[0],
      className:
        "col-start-1 col-span-5 row-start-1 row-span-3 md:col-span-4 md:row-span-4",
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
    <section className="relative mx-auto max-w-[1200px] px-4 py-16 md:py-24">
      {caption && (
        <h2 className="mx-auto mb-10 max-w-2xl text-center text-2xl font-extrabold leading-tight text-[#333] md:text-4xl">
          {caption}
        </h2>
      )}
      <div className={`relative grid grid-cols-12 gap-3 md:gap-5 ${height}`}>
        {defaultTiles.map((t, i) => (
          <FloatingTile key={i} tile={t} />
        ))}
      </div>
    </section>
  );
}

function FloatingTile({ tile }: { tile: Tile }) {
  const ref = useRef<HTMLVideoElement | null>(null);

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

  return (
    <div
      className={`group relative ${tile.className} ${tile.bobClass}`}
      style={{ transform: `rotate(${tile.rotate}deg)` }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-black shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
        <video
          ref={ref}
          src={tile.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {tile.caption && (
          <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#7f161c] shadow">
            {tile.caption}
          </div>
        )}
      </div>
    </div>
  );
}
