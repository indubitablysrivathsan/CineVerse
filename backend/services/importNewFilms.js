const { PrismaClient } = require("@prisma/client");
const { tmdbFetch } = require("./tmdb.js");

const prisma = new PrismaClient();

async function throttle() {
  await new Promise(r => setTimeout(r, 600));
}


async function importFilm(tmdbId) {
  const exists = await prisma.film.findUnique({ where: { tmdbId } });
  if (exists) return;

  await throttle();
  const full = await tmdbFetch(
    `/movie/${tmdbId}?append_to_response=credits,videos`
  );

  const trailer = full.videos?.results?.find(
    v => v.type === "Trailer" && v.site === "YouTube"
  );

  await prisma.film.create({
        data: {
          tmdbId: tmdbId,
          title: full.title,
          year: full.release_date
            ? Number(full.release_date.slice(0, 4))
            : null,
          synopsis: full.overview,
          posterUrl: full.poster_path
            ? `https://image.tmdb.org/t/p/w500${full.poster_path}`
            : null,
          director:
            full.credits?.crew?.find(c => c.job === "Director")?.name || null,
          language: full.original_language,
          trailerUrl: trailer
            ? `https://www.youtube.com/watch?v=${trailer.key}`
            : null,
          tags: full.genres?.map(g => g.name).join(","),
        },
      });
}

async function safeImportFilm(id) {
  try {
    await importFilm(id);
  } catch (e) {
    console.error(`Failed to import film ${id}`);
  }
}

const ART_DIRECTORS = [
  "Satyajit Ray",
  "K. Balachander",
  "Andrei Tarkovsky",
  "Krzysztof Kieslowski",
  "Wojciech Has",
  "Andrzej Zulawski",
  "Bela Tarr",
  "Wong Kar-wai",
  "Apichatpong Weerasethakul",
];

async function importByDirector(name) {
  await throttle();
  const search = await tmdbFetch(
    `/search/person?query=${encodeURIComponent(name)}`
  );

  const person = search.results?.[0];
  if (!person) return;

  const credits = await tmdbFetch(
    `/person/${person.id}/movie_credits`
  );

  for (const movie of credits.crew.filter(m => m.job === "Director")) {
    await safeImportFilm(movie.id);
  }
}

const CANONICAL_TMDB_IDS = [
  985,   // Eraserhead
  395780,  // Ooruku nooruper
  81401, //the turin horse
  110402, //hard to be a god
  1005828, //goat and her three kids
  46315, //Valerie and Her Week of Wonders
  524789, //the-devil-s-doorway
  256042, // agraharathil kazhuthai

];


async function runArtCinemaIngestion() {
  for (const id of CANONICAL_TMDB_IDS) {
    await safeImportFilm(id);
  }
  for (const name of ART_DIRECTORS) {
    await importByDirector(name);
  }
}


// Export for other scripts if needed
module.exports = { runArtCinemaIngestion };

// Run directly if this script is executed with Node
if (require.main === module) {
  runArtCinemaIngestion();
}