import { watchlist } from "../data/movies";

export default function Watchlist() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
      {/* ── Заголовок ── */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm">📋</span>
        <span className="font-inter text-[11px] font-semibold tracking-[0.15em] text-white/35 uppercase">
          Что посмотреть
        </span>
        <span className="font-inter text-[11px] text-white/15">
          {watchlist.length}
        </span>
      </div>

      {/* ── Список: 1 колонка → 2 → 3 ── */}
      <div className="columns-1 gap-x-6 sm:columns-2 lg:columns-3">
        {watchlist.map((item, i) => (
          <div
            key={i}
            className="flex items-baseline gap-2 break-inside-avoid py-[5px]"
          >
            <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-white/15" />
            <span className="font-inter text-[13px] leading-snug text-white/30 sm:text-[13px]">
              {item.title}
            </span>
            {item.episodes && (
              <span className="flex-shrink-0 font-inter text-[10px] text-white/15">
                {item.episodes}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
