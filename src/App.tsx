import { useState, useEffect, useRef, useCallback } from "react";
import { movies } from "./data/movies";
import Background from "./components/Background";
import MovieCard from "./components/MovieCard";
import MovieList from "./components/MovieList";
import Watchlist from "./components/Watchlist";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const setRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    },
    []
  );

  // ── Определяем активную секцию при скролле ──
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      let newActiveIndex = -1;

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        const threshold = windowHeight * 0.4;
        if (rect.top < threshold && rect.top + rect.height > threshold) {
          newActiveIndex = i;
          break;
        }
      }
      setActiveIndex(newActiveIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Предзагрузка фоновых картинок ──
  useEffect(() => {
    movies.forEach((m) => {
      if (m.backgroundImage) {
        const img = new Image();
        img.src = m.backgroundImage;
      }
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <Background activeIndex={activeIndex} />

      {/* ══════════════════════════════════════════════
          ГЛАВНАЯ СЕКЦИЯ
          - Мобильный: естественный поток, pt/pb
          - Десктоп: центрирование по вертикали
          ══════════════════════════════════════════════ */}
      <header
        className="
          relative flex flex-col items-center
          px-4 pt-16 pb-10
          sm:px-6 sm:pt-20 sm:pb-14
          lg:min-h-screen lg:justify-center lg:pt-0 lg:pb-0
        "
      >
        {/* Бейдж */}
        <div className="mb-8 sm:mb-10 lg:absolute lg:top-6 lg:left-1/2 lg:mb-0 lg:-translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="text-sm sm:text-base">🎬</span>
            <span className="font-inter text-[10px] font-medium tracking-[0.15em] text-white/40 uppercase sm:tracking-[0.2em]">
              Кинодневник
            </span>
          </div>
        </div>

        {/* Заголовок */}
        <div className="mb-8 text-center sm:mb-10">
          <h1
            className="
              font-playfair font-bold text-white leading-[1.1]
              text-4xl
              sm:text-5xl
              lg:text-6xl
            "
          >
            Мои{" "}
            <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
              рецензии
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-xs font-inter text-[13px] leading-relaxed text-white/30 sm:mt-4 sm:max-w-sm sm:text-sm">
            {movies.length} просмотрено · выбери из списка или листай вниз
          </p>
        </div>

        {/* Компактный список фильмов */}
        <MovieList activeIndex={activeIndex} />

        {/* Стрелка вниз — видна только на lg+ когда помещается */}
        <button
          onClick={() => {
            const el = document.getElementById(movies[0].id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-8 hidden flex-col items-center gap-1.5 lg:flex"
        >
          <span className="font-inter text-[10px] tracking-widest text-white/25 uppercase">
            вниз
          </span>
          <svg
            className="h-4 w-4 animate-bounce text-white/25"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </header>

      {/* ══════════════════════════════════════════════
          СЕКЦИИ ФИЛЬМОВ
          ══════════════════════════════════════════════ */}
      <main>
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            ref={setRef(index)}
            movie={movie}
            index={index}
          />
        ))}
      </main>

      {/* ══════════════════════════════════════════════
          ВОТЧЛИСТ + ФУТЕР
          ══════════════════════════════════════════════ */}
      <footer className="relative pb-8 pt-12 sm:pt-16">
        <div className="mx-auto mb-10 h-px w-16 bg-white/10 sm:mb-12 sm:w-20" />
        <Watchlist />
        <div className="mt-12 text-center sm:mt-16">
          <div className="mx-auto h-px w-10 bg-white/10" />
          <p
            className="mt-5 font-inter text-[11px] text-white/15"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            🍿
          </p>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════
          КНОПКА «НАВЕРХ»
          ══════════════════════════════════════════════ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`
          fixed z-50 flex items-center justify-center
          rounded-full border border-white/10 bg-black/60
          text-white/50 backdrop-blur-sm
          transition-all duration-300
          active:scale-90
          hover:bg-white/10 hover:text-white

          /* Размер: больше на мобильном (для пальцев) */
          h-11 w-11
          sm:h-10 sm:w-10

          /* Позиция: с учётом safe-area */
          bottom-5 left-4
          sm:bottom-5 sm:left-5

          ${
            activeIndex >= 0
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 pointer-events-none"
          }
        `}
        style={{ bottom: `max(1.25rem, env(safe-area-inset-bottom))` }}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
