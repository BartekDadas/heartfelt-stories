export function CommentsSkeleton() {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#1a1416] p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] md:p-9">
      <h3 className="mb-6 text-xl font-extrabold text-white">Komentarze</h3>
      <ul className="space-y-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i} className="flex gap-4">
            <div className="sp-skel h-11 w-11 shrink-0 rounded-full bg-white/10" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="sp-skel h-3 w-32 rounded bg-white/10" />
              <div className="sp-skel h-3 w-full rounded bg-white/10" />
              <div className="sp-skel h-3 w-4/5 rounded bg-white/10" />
              {i % 2 === 0 && <div className="sp-skel h-3 w-2/3 rounded bg-white/10" />}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
