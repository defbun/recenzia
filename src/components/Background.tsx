import { movies, overlayGradients } from "../data/movies";

interface BackgroundProps {
  activeIndex: number;
}

// Градиенты-заглушки когда нет backgroundImage
const fallbackGradients: Record<string, string> = {
  dark:    "from-gray-950 via-slate-900 to-gray-950",
  blue:    "from-slate-950 via-blue-950 to-cyan-950",
  warm:    "from-stone-950 via-amber-950 to-orange-950",
  green:   "from-gray-950 via-emerald-950 to-teal-950",
  purple:  "from-slate-950 via-purple-950 to-violet-950",
  red:     "from-stone-950 via-red-950 to-rose-950",
  neutral: "from-neutral-950 via-stone-900 to-zinc-950",
};

export default function Background({ activeIndex }: BackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10">
      {movies.map((movie, index) => {
        const hasImage = movie.backgroundImage.length > 0;
        const isActive = activeIndex === index;

        // Рендерим только ±2 от активного (оптимизация для мобильных)
        const isNearby =
          activeIndex === -1
            ? index < 3
            : Math.abs(index - activeIndex) <= 2;

        if (!isNearby && !isActive) return null;

        return (
          <div
            key={movie.id}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity]"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            {hasImage ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${movie.backgroundImage})` }}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${overlayGradients[movie.overlayColor]}`}
                />
                <div className="absolute inset-0 bg-black/20" />
              </>
            ) : (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${fallbackGradients[movie.overlayColor]}`}
              />
            )}
          </div>
        );
      })}

      {/* Фон героя (главная) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-950 via-slate-950 to-black transition-opacity duration-1000"
        style={{ opacity: activeIndex === -1 ? 1 : 0 }}
      />

      {/* Лёгкая зернистость (скрываем на мобильных для производительности) */}
      <div
        className="absolute inset-0 hidden opacity-[0.02] sm:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
