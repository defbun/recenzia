import { forwardRef } from "react";
import type { Movie } from "../data/movies";
import { categoryInfo } from "../data/movies";

interface MovieCardProps {
  movie: Movie;
  index: number;
}

const MovieCard = forwardRef<HTMLElement, MovieCardProps>(
  ({ movie, index }, ref) => {
    const catInfo = categoryInfo[movie.type];
    const hasReview = movie.review.length > 0;
    const hasRating = movie.rating > 0;

    return (
      <section
        ref={ref}
        id={movie.id}
        data-movie-index={index}
        className="
          relative flex items-center justify-center
          min-h-[55vh] px-5 py-14
          sm:min-h-[60vh] sm:px-6 sm:py-16
          lg:min-h-[65vh] lg:px-8 lg:py-20
        "
      >
        <div className="mx-auto w-full max-w-3xl">

          {/* ── Большой номер на фоне ── */}
          <div
            className="
              font-inter font-black leading-none text-white/[0.03] select-none
              text-[5rem]
              sm:text-[8rem]
              lg:text-[11rem]
            "
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="-mt-12 sm:-mt-20 lg:-mt-28">

            {/* ── Категория + мета ── */}
            <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mb-3">
              <span className={`inline-block h-2 w-2 rounded-full ${catInfo.color}`} />
              <span className="font-inter text-[10px] font-medium tracking-widest text-white/40 uppercase sm:text-[11px]">
                {catInfo.label}
              </span>
              {movie.episodes && (
                <>
                  <span className="text-white/15">·</span>
                  <span className="font-inter text-[10px] text-white/30 sm:text-[11px]">
                    {movie.episodes}
                  </span>
                </>
              )}
              {movie.year > 0 && (
                <>
                  <span className="text-white/15">·</span>
                  <span className="font-inter text-[10px] tabular-nums text-white/30 sm:text-[11px]">
                    {movie.year}
                  </span>
                </>
              )}
            </div>

            {/* ── Название ── */}
            <h2
              className="
                font-playfair font-bold text-white leading-[1.1]
                text-2xl
                sm:text-4xl
                lg:text-5xl
              "
            >
              {movie.title}
            </h2>

            {/* ── Рейтинг ── */}
            {hasRating && (
              <div className="mt-3 flex items-center gap-1 sm:mt-4 sm:gap-1.5">
                {Array.from({ length: 10 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-base sm:text-lg ${
                      i < movie.rating ? "text-amber-400" : "text-white/15"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-1.5 font-inter text-xs text-white/40 sm:ml-2 sm:text-sm">
                  {movie.rating}/10
                </span>
              </div>
            )}

            {/* ── Рецензия ── */}
            {hasReview ? (
              <div className="mt-4 max-w-2xl sm:mt-6">
                <p
                  className="
                    font-inter font-light text-white/65
                    text-[15px] leading-[1.7]
                    sm:text-base sm:leading-[1.8]
                    lg:text-lg lg:leading-[1.85]
                  "
                >
                  {movie.review}
                </p>
              </div>
            ) : (
              <div className="mt-4 sm:mt-6">
                <p className="font-inter text-xs text-white/20 italic sm:text-sm">
                  Рецензия скоро будет...
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

MovieCard.displayName = "MovieCard";
export default MovieCard;
