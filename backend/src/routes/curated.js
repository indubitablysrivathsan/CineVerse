const express = require("express");
const prisma = require("../db");
const router = express.Router();
const { requireAuth } = require("../auth");

router.get("/", requireAuth, async (req, res) => {
  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;

    // Get journals with related films
    const reviewed = await prisma.journalEntry.findMany({
      where: { userId },
      include: { film: true },
    });

    if (!reviewed || reviewed.length === 0) {
      return res.json([]);
    }

    // Filter out broken relations
    const validFilms = reviewed
      .map(r => r.film)
      .filter(f => f !== null);

    if (validFilms.length === 0) {
      return res.json([]);
    }

    // Extract unique genres and directors
    const genres = [
      ...new Set(validFilms.map(f => f.genre).filter(Boolean))
    ];

    const directors = [
      ...new Set(validFilms.map(f => f.director).filter(Boolean))
    ];

    if (genres.length === 0 && directors.length === 0) {
      return res.json([]);
    }

    // Exclude already reviewed film IDs
    const reviewedIds = validFilms.map(f => f.id);

    const suggestions = await prisma.film.findMany({
      where: {
        AND: [
          {
            OR: [
              genres.length > 0 ? { genre: { in: genres } } : undefined,
              directors.length > 0 ? { director: { in: directors } } : undefined,
            ].filter(Boolean),
          },
          {
            id: { notIn: reviewedIds },
          },
        ],
      },
      take: 50,
    });

    if (!suggestions || suggestions.length === 0) {
      return res.json([]);
    }

    // Shuffle
    const shuffled = suggestions.sort(() => 0.5 - Math.random());

    res.json(shuffled.slice(0, 12));

  } catch (err) {
    console.error("CURATED ERROR:", err);
    res.status(500).json({ error: "Failed to fetch curated list" });
  }
});

module.exports = router;