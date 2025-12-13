require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const filmsData = [
    {
      title: "You Won't Be Alone",
      year: 2022,
      director: "Goran Stolevski",
      country: "Australia, United Kingdom, North Macedonia, Serbia",
      language: "Macedonian",
      synopsis: "In an isolated mountain village in 19th century Macedonia, a young girl is kidnapped and then transformed into a witch by an ancient spirit.",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BNjM3ODYzMmQtMzc5Mi00Y2MwLWIyNWEtMWFjZTM5ZTA0ZWFlXkEyXkFqcGc@._V1_.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=O_C8A6oPp28",
      tags: "drama,fantasy,horror,slow-cinema"
    },
    {
      title: "On the Silver Globe",
      year: 1988,
      director: "Andrzej Zulawski",
      country: "Poland",
      language: "Polish",
      synopsis: "A team of astronauts land on an inhabitable planet and form a society. Many years later, a single astronaut is sent to the planet and becomes a messiah.",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BYWIzYjkxNzctZjQ2Ni00NzFhLWFkOWQtNDZlYTYzOTVkOWZlXkEyXkFqcGc@._V1_.jpg",
      trailerUrl: "https://www.imdb.com/video/embed/vi3104227865/",
      tags: "sci-fi,surreal,adventure,philosophical,fantasy"
    },
    {
      title: "The Hourglass Sanatorium",
      year: 1973,
      director: "Wojciech Has",
      country: "Poland",
      language: "Polish, Yiddish",
      synopsis: "Józef visits his dying father at a remote mental institution, where time itself doesn't seem to exist, and the line between dreams and memories becomes indistinguishable.",
      posterUrl: "https://i.etsystatic.com/23186997/r/il/ba49c0/3437248507/il_1080xN.3437248507_lmrh.jpg",
      trailerUrl: "https://www.imdb.com/video/vi529777177/",
      tags: "surrealist,psychological,fantasy,horror"
    },
    {
      title: "Andha Naal",
      year: 1954,
      director: "S. Balachander",
      country: "India",
      language: "Tamil",
      synopsis: "After an engineer is shot dead, several people around him relate different versions and the related incidents that may have led to the murder.",
      posterUrl: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p12380348_p_v8_aa.jpg",
      trailerUrl: null,
      tags: "crime,mystery,thriller"
    },
  ];

  for (const film of filmsData) {
    await prisma.film.create({ data: film });
  }

  console.log("Seeded films.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
