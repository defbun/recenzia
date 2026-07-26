import { moviesByCategory, categoryInfo, type Movie } from "../data/movies";

interface MovieListProps {
  activeIndex: number;
}

/* ── Одна строка фильма ── */
function MovieRow({
  movie,
  isActive,
  categoryColor,
  onClick,
}: {
  movie: Movie;
  isActive: boolean;
  categoryColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        group flex w-full items-center gap-2 rounded-lg
        px-3 py-2.5 text-left
        transition-all duration-150
        active:scale-[0.98]
        sm:gap-2.5 sm:py-2
        ${isActive ? "bg-white/10" : "hover:bg-white/[0.06]"}
      `}
    >
      {/* Цветная точка */}
      <span
        className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${categoryColor} ${
          isActive ? "opacity-100" : "opacity-30"
        }`}
      />

      {/* Название */}
      <span
        className={`min-w-0 flex-1 truncate font-inter text-sm transition-colors sm:text-[13px] ${
          isActive
            ? "font-medium text-white"
            : "text-white/55 group-hover:text-white/90"
        }`}
      >
        {movie.title}
      </span>

      {/* Эпизоды (скрыты на очень маленьких) */}
      {movie.episodes && (
        <span className="hidden flex-shrink-0 font-inter text-[11px] text-white/20 xs:block sm:block">
          {movie.episodes}
        </span>
      )}

      {/* Год */}
      {movie.year > 0 && (
        <span className="hidden flex-shrink-0 font-inter text-[11px] tabular-nums text-white/20 sm:block">
          {movie.year}
        </span>
      )}

      {/* Рейтинг — точки на sm+, число на мобильном */}
      {movie.rating > 0 && (
        <>
          {/* Мобильная версия — просто число */}
          <span className="flex-shrink-0 font-inter text-[11px] font-medium tabular-nums text-amber-400/70 sm:hidden">
            {movie.rating}
          </span>

          {/* Десктопная версия — точки */}
          <span className="hidden flex-shrink-0 items-center gap-[2px] sm:flex">
            {Array.from({ length: 10 }, (_, j) => (
              <span
                key={j}
                className={`inline-block h-[5px] w-[5px] rounded-full ${
                  j < movie.rating ? "bg-amber-400/70" : "bg-white/[0.06]"
                }`}
              />
            ))}
          </span>
        </>
      )}
    </button>
  );
}

export default function MovieList({ activeIndex }: MovieListProps) {
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  let globalIndex = 0;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      {moviesByCategory.map((category) => {
        const info = categoryInfo[category.type];
        const startIndex = globalIndex;

        // Разбиваем на 2 колонки для планшетов (md+)
        const mid = Math.ceil(category.items.length / 2);
        const col1 = category.items.slice(0, mid);
        const col2 = category.items.slice(mid);

        const result = (
          <div key={category.type}>
            {/* ── Заголовок категории ── */}
            <div className="mb-1 flex items-center gap-2 px-3">
              <span className="text-sm">{info.emoji}</span>
              <span className="font-inter text-[11px] font-semibold tracking-[0.15em] text-white/35 uppercase">
                {info.label}
              </span>
              <span className="font-inter text-[11px] text-white/15">
                {category.items.length}
              </span>
            </div>

            {/* ── Одна колонка на мобильном, две на md+ ── */}
            <div className="md:grid md:grid-cols-2 md:gap-x-2">
              {/* Колонка 1 */}
              <div className="flex flex-col">
                {col1.map((movie, i) => {
                  const idx = startIndex + i;
                  return (
                    <MovieRow
                      key={movie.id}
                      movie={movie}
                      isActive={activeIndex === idx}
                      categoryColor={info.color}
                      onClick={() => handleClick(movie.id)}
                    />
                  );
                })}
              </div>

              {/* Колонка 2 */}
              <div className="flex flex-col">
                {col2.map((movie, i) => {
                  const idx = startIndex + mid + i;
                  return (
                    <MovieRow
                      key={movie.id}
                      movie={movie}
                      isActive={activeIndex === idx}
                      categoryColor={info.color}
                      onClick={() => handleClick(movie.id)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );

        globalIndex = startIndex + category.items.length;
        return result;
      })}
    </div>
  );
}
