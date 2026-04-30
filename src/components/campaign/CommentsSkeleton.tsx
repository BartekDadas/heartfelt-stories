export function CommentsSkeleton() {
  return (
    <article className="rounded-2xl bg-white p-7 shadow-md md:p-9">
      <h3 className="mb-6 text-xl font-extrabold text-[#333]">Komentarze</h3>
      <ul className="space-y-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i} className="flex gap-4">
            <div className="sp-skel h-11 w-11 shrink-0 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="sp-skel h-3 w-32 rounded bg-gray-200" />
              <div className="sp-skel h-3 w-full rounded bg-gray-200" />
              <div className="sp-skel h-3 w-4/5 rounded bg-gray-200" />
              {i % 2 === 0 && <div className="sp-skel h-3 w-2/3 rounded bg-gray-200" />}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
