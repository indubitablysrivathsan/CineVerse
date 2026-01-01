const express = require("express");
const prisma = require("../db");
const router = express.Router();

// GET /films?country=&year=&search=&mood=&festival=&era=&search=
router.get("/", async (req, res) => {
  try {
    const { title, director, genre, language, mood, festival, era } = req.query;

    const where = {};

    if (title) {
      where.title = { contains: title, mode: "insensitive" };
    }

    if (director) {
      where.director = { contains: director, mode: "insensitive" };
    }

    if (genre) {
      where.tags = { contains: genre, mode: "insensitive" };
    }

    if (language) {
      where.language = { contains: language, mode: "insensitive" };
    }

    if (mood) {
      where.moods = { contains: mood, mode: "insensitive" };
    }

    // if (year) {
    //   const parsedYear = parseInt(year, 10);
    //   if (!isNaN(parsedYear)) where.year = parsedYear;
    // }

    // if (festival) {
    //   where.festival = { contains: festival, mode: "insensitive" };
    // }

    // if (era) {
    //   where.era = { contains: era, mode: "insensitive" };
    // }

    const films = await prisma.$queryRaw`
      SELECT * FROM "Film"
      ORDER BY RANDOM()
    `;

    res.json(films);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /:id
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid film id" });
    }

    const film = await prisma.film.findUnique({
      where: { id }
    });

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    res.json(film);
  } catch (err) {
    console.error("Error fetching film:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;