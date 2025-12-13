const express = require("express");
const prisma = require("../db");
const router = express.Router();

// Middleware: requires req.user from auth middleware
router.get("/", async (req, res) => {
  try {
    const entries = await prisma.journalEntry.findMany({
      where: { userId: req.user.id },
      include: { film: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch journal entries" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { filmId, rating, note, watchedOn } = req.body;

    const entry = await prisma.journalEntry.create({
      data: {
        userId: req.user.id,
        filmId,
        rating,
        note,
        watchedOn: watchedOn ? new Date(watchedOn) : null,
      },
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: "Failed to create journal entry" });
  }
});

module.exports = router;