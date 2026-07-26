// ╔══════════════════════════════════════════════════════════════╗
// ║                   КАК РЕДАКТИРОВАТЬ                         ║
// ╠══════════════════════════════════════════════════════════════╣
// ║                                                              ║
// ║  ДОБАВИТЬ ФИЛЬМ:                                            ║
// ║    Скопируй любой блок { ... } и вставь в нужную            ║
// ║    категорию. Поменяй данные.                                ║
// ║                                                              ║
// ║  УДАЛИТЬ ФИЛЬМ:                                             ║
// ║    Удали весь блок { ... } вместе с запятой после.           ║
// ║                                                              ║
// ║  ПОМЕНЯТЬ ПОРЯДОК:                                          ║
// ║    Перетащи блок { ... } выше или ниже.                     ║
// ║                                                              ║
// ║  ПОЛЯ:                                                       ║
// ║    id          — уникальный id (латиницей, через дефис)      ║
// ║    title       — название (любой язык)                       ║
// ║    year        — год (0 если не знаешь)                      ║
// ║    episodes    — кол-во эпизодов ("" если фильм)             ║
// ║    rating      — от 0 до 10 (0 = ещё не оценил)             ║
// ║    review      — твоя рецензия ("" если пока нет)            ║
// ║    backgroundImage — ссылка на БОЛЬШУЮ картинку              ║
// ║                      (скриншот из фильма, кадр и т.д.)       ║
// ║                      "" = будет просто градиент              ║
// ║    overlayColor — затемнение поверх фона:                    ║
// ║       "dark"     чёрное                                      ║
// ║       "blue"     синее (sci-fi)                              ║
// ║       "warm"     тёплое (драма, комедия)                     ║
// ║       "green"    зелёное                                     ║
// ║       "purple"   фиолетовое                                  ║
// ║       "red"      красное                                     ║
// ║       "neutral"  серое                                       ║
// ║                                                              ║
// ║  КАРТИНКИ:                                                   ║
// ║    Вариант 1: загрузи на imgur.com → вставь ссылку           ║
// ║    Вариант 2: кинь файл в папку public/ →                    ║
// ║               пиши "/имя-файла.jpg"                          ║
// ║    Вариант 3: любая прямая ссылка на картинку                ║
// ║                                                              ║
// ╚══════════════════════════════════════════════════════════════╝

// ─── Типы ────────────────────────────────────────────────────

export type MediaType = "movie" | "anime" | "cartoon";
export type OverlayColor = "dark" | "blue" | "warm" | "green" | "purple" | "red" | "neutral";

export interface Movie {
  id: string;
  title: string;
  year: number;        // 0 = не указан
  episodes: string;    // "" = фильм, "12 эп." = сериал
  rating: number;      // 0-10, 0 = не оценён
  review: string;      // "" = пока нет рецензии
  backgroundImage: string; // "" = только градиент
  overlayColor: OverlayColor;
  type: MediaType;
}

// ─── Градиенты для затемнения ────────────────────────────────

export const overlayGradients: Record<OverlayColor, string> = {
  dark:    "from-black/85 via-gray-950/80 to-black/90",
  blue:    "from-cyan-950/85 via-blue-950/80 to-slate-950/90",
  warm:    "from-amber-950/85 via-orange-950/80 to-stone-950/90",
  green:   "from-teal-950/85 via-emerald-950/80 to-gray-950/90",
  purple:  "from-purple-950/85 via-violet-950/80 to-slate-950/90",
  red:     "from-red-950/85 via-rose-950/80 to-stone-950/90",
  neutral: "from-stone-950/85 via-neutral-900/80 to-zinc-950/90",
};

// ─── Цвета категорий (для иконок в списке) ───────────────────

export const categoryInfo: Record<MediaType, { label: string; emoji: string; color: string }> = {
  movie:   { label: "Фильмы",        emoji: "🎬", color: "bg-amber-400" },
  anime:   { label: "Аниме",         emoji: "🎌", color: "bg-rose-400" },
  cartoon: { label: "Мультсериалы",  emoji: "🎨", color: "bg-emerald-400" },
};


// ══════════════════════════════════════════════════════════════
//  🎬 ФИЛЬМЫ
// ══════════════════════════════════════════════════════════════

const films: Movie[] = [
  {
    id: "tenet",
    title: "Довод",
    year: 2020,
    episodes: "",
    rating: 10,
    review: "Мы в ахуе",
    backgroundImage: "https://images.pexels.com/photos/35171250/pexels-photo-35171250.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    overlayColor: "blue",
    type: "movie",
  },
  {
    id: "inception",
    title: "Начало",
    year: 2010,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "https://images.pexels.com/photos/37269546/pexels-photo-37269546.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    overlayColor: "blue",
    type: "movie",
  },
  {
    id: "michael",
    title: "Майкл",
    year: 0,
    episodes: "",
    rating: 8,
    review: "Прям хорошо",
    backgroundImage: "",
    overlayColor: "dark",
    type: "movie",
  },
  {
    id: "500-days-of-summer",
    title: "500 дней лета",
    year: 2009,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "https://images.pexels.com/photos/20514772/pexels-photo-20514772.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    overlayColor: "warm",
    type: "movie",
  },
  {
    id: "four-lions",
    title: "Четыре льва",
    year: 2010,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "warm",
    type: "movie",
  },
  {
    id: "backstage",
    title: "Закулисье",
    year: 0,
    episodes: "",
    rating: 9,
    review: "Ахуенно",
    backgroundImage: "https://images.pexels.com/photos/19057545/pexels-photo-19057545.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    overlayColor: "dark",
    type: "movie",
  },
  {
    id: "obsession",
    title: "Обсессия",
    year: 0,
    episodes: "",
    rating: 5,
    review: "Среднячок",
    backgroundImage: "",
    overlayColor: "neutral",
    type: "movie",
  },
  {
    id: "unfriended",
    title: "Убрать из друзей",
    year: 2014,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "dark",
    type: "movie",
  },
  {
    id: "king-kong",
    title: "Кинг Конг",
    year: 0,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "https://images.pexels.com/photos/21858656/pexels-photo-21858656.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    overlayColor: "warm",
    type: "movie",
  },
  {
    id: "zootopia-2",
    title: "Зверополис 2",
    year: 2025,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "green",
    type: "movie",
  },
  {
    id: "kpop-vs-demons",
    title: "К-поп против демонов",
    year: 0,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "purple",
    type: "movie",
  },
  {
    id: "chained",
    title: "На цепи",
    year: 0,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "red",
    type: "movie",
  },
  {
    id: "as-above-so-below",
    title: "Париж — город мертвых",
    year: 2014,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "https://images.pexels.com/photos/5604044/pexels-photo-5604044.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    overlayColor: "dark",
    type: "movie",
  },
  {
    id: "one-two-ghost",
    title: "Два, три, призрак приди",
    year: 0,
    episodes: "",
    rating: 2,
    review: "Хуетень",
    backgroundImage: "",
    overlayColor: "dark",
    type: "movie",
  },
  {
    id: "end-of-the-world",
    title: "Конец Света",
    year: 2026,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "red",
    type: "movie",
  },
  {
    id: "exit-8",
    title: "Выход 8",
    year: 0,
    episodes: "",
    rating: 3,
    review: "Сюжет говноооо",
    backgroundImage: "",
    overlayColor: "dark",
    type: "movie",
  },
  {
    id: "17-26",
    title: "17-26",
    year: 0,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "neutral",
    type: "movie",
  },
];


// ══════════════════════════════════════════════════════════════
//  🎌 АНИМЕ
// ══════════════════════════════════════════════════════════════

const anime: Movie[] = [
  {
    id: "death-note",
    title: "Тетрадь смерти",
    year: 2006,
    episodes: "37 эп.",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "dark",
    type: "anime",
  },
  {
    id: "terror-in-resonance",
    title: "Эхо террора",
    year: 2014,
    episodes: "11 эп.",
    rating: 0,
    review: "",
    backgroundImage: "https://images.pexels.com/photos/6494918/pexels-photo-6494918.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    overlayColor: "blue",
    type: "anime",
  },
  {
    id: "wonder-egg-priority",
    title: "Приоритет Чудо-Яйца",
    year: 2021,
    episodes: "13 эп.",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "purple",
    type: "anime",
  },
  {
    id: "gangsta",
    title: "Гангста",
    year: 2015,
    episodes: "12 эп.",
    rating: 3,
    review: "Не нрав ❌",
    backgroundImage: "",
    overlayColor: "dark",
    type: "anime",
  },
  {
    id: "takopi-original-sin",
    title: "Первородный грех Такопи",
    year: 2022,
    episodes: "6 эп.",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "dark",
    type: "anime",
  },
  {
    id: "conspiracy-corp",
    title: "Корпорация Заговор",
    year: 0,
    episodes: "18 эп.",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "blue",
    type: "anime",
  },
  {
    id: "suzume",
    title: "Судзумэ закрывает двери",
    year: 2022,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "blue",
    type: "anime",
  },
  {
    id: "sakamoto-days",
    title: "Дни Сакамото",
    year: 2025,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "warm",
    type: "anime",
  },
  {
    id: "gachiakuta",
    title: "Гачиакута",
    year: 2025,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "dark",
    type: "anime",
  },
];


// ══════════════════════════════════════════════════════════════
//  🎨 МУЛЬТСЕРИАЛЫ
// ══════════════════════════════════════════════════════════════

const cartoons: Movie[] = [
  {
    id: "digital-circus",
    title: "Цифровой цирк",
    year: 2023,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "purple",
    type: "cartoon",
  },
  {
    id: "smiling-friends",
    title: "Друзьяшки-улыбашки",
    year: 2022,
    episodes: "",
    rating: 0,
    review: "",
    backgroundImage: "",
    overlayColor: "green",
    type: "cartoon",
  },
  {
    id: "total-drama",
    title: "Вот это драма",
    year: 0,
    episodes: "",
    rating: 6,
    review: "Моё — норм, снято прикольно, главное что вызывает эмоции. Даня — кринж пиздец какой, но норм.",
    backgroundImage: "",
    overlayColor: "warm",
    type: "cartoon",
  },
    {
    id: "rick-and-morty",
    title: "Рик и морти",
    year: 0,
    episodes: "",
    rating: 9,
    review: "Моё — норм, снято прикольно, главное что вызывает эмоции. Даня — кринж пиздец какой, но норм.",
    backgroundImage: "https://upload.wikimedia.org/wikipedia/ru/7/70/Rick_and_Morty_Season_1.jpg",
    overlayColor: "warm",
    type: "cartoon",
  },
];


// ─── Все фильмы одним массивом (порядок: фильмы → аниме → мульты) ──

export const movies: Movie[] = [...films, ...anime, ...cartoons];

// ─── Группировка по категориям ───────────────────────────────

export const moviesByCategory: { type: MediaType; items: Movie[] }[] = [
  { type: "movie",   items: films },
  { type: "anime",   items: anime },
  { type: "cartoon", items: cartoons },
];


// ══════════════════════════════════════════════════════════════
//  📋 ВОТЧЛИСТ (что ещё посмотреть)
// ══════════════════════════════════════════════════════════════

export interface WatchlistItem {
  title: string;
  episodes: string;  // "" если фильм
}

export const watchlist: WatchlistItem[] = [
  { title: "Пираты чёрной лагуны",   episodes: "29 эп." },
  { title: "91 день",                 episodes: "12 эп." },
  { title: "Человек-дьявол: Плакса",  episodes: "10 эп." },
  { title: "Пожиратель душ",          episodes: "51 эп." },
  { title: "Эрго Прокси",             episodes: "23 эп." },
  { title: "Все страхи Бо",           episodes: "" },
  { title: "Стометровка",             episodes: "" },
  { title: "Зелёный слоник",          episodes: "" },
  { title: "Хвост Феи",               episodes: "328 эп." },
  { title: "Созданный в бездне",      episodes: "25 эп. + фильм" },
  { title: "Маг-целитель",            episodes: "12 эп." },
  { title: "Обитель зла 1",           episodes: "" },
  { title: "Крепкий орешек",          episodes: "" },
  { title: "Страсти Христовы",        episodes: "" },
  { title: "Жуткая правда",           episodes: "13 эп." },
  { title: "Одно целое",              episodes: "" },
  { title: "Кловерфилд, 10",          episodes: "" },
  { title: "Вход в пустоту",          episodes: "" },
  { title: "Хоримия",                 episodes: "26 эп." },
  { title: "Марти Суприм",            episodes: "" },
  { title: "Saltburn",                episodes: "" },
  { title: "Джей и Молчаливый Боб",   episodes: "" },
  { title: "Большой рот",             episodes: "81 эп." },
  { title: "Монолог фармацевта",      episodes: "48 эп." },
];
