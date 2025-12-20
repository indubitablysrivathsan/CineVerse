const express = require("express");
const prisma = require("../db");
const router = express.Router();
const { requireAuth } = require("../auth");

// GET /journals/community
router.get("/community", async (req, res) => {
  try {
    const currentUserId = req.user?.id;
    const entries = await prisma.journalEntry.findMany({
      where: {
        visibility: "PUBLIC",
        ...(currentUserId && {
          userId: {
            not: currentUserId,
          },
        }),
      },
      include: {
        film: true,
        user: {
          select: { displayName: true },
        },
        journalMood: {
          select: { moodLabel: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch community journals" });
  }
});

// GET /journal/community/:id
router.get("/community/:id", async (req, res) => {
  const entryId = parseInt(req.params.id, 10);

  if (isNaN(entryId)) {
    return res.status(400).json({ error: "Invalid entry id" });
  }

  try {
    const entry = await prisma.journalEntry.findFirst({
      where: {
        id: entryId,
        visibility: "PUBLIC",
      },
      include: {
        film: true,
        user: {
          select: { displayName: true },
        },
        journalMood: true,
      },
    });

    if (!entry) {
      return res.status(404).json({ error: "Journal not found" });
    }

    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch journal entry" });
  }
});


//view personal journals
router.get("/", requireAuth, async (req, res) => {
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

// GET /journal/:id  (owner only)
router.get("/:id", requireAuth, async (req, res) => {
  const entryId = parseInt(req.params.id, 10);

  if (isNaN(entryId)) {
    return res.status(400).json({ error: "Invalid entry id" });
  }

  try {
    const entry = await prisma.journalEntry.findFirst({
      where: {
        id: entryId,
        userId: req.user.id,
      },
      include: {
        film: true,
        journalMood: true,
      },
    });

    if (!entry) {
      return res.status(404).json({ error: "Journal not found" });
    }

    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch journal entry" });
  }
});

//create
router.post("/", requireAuth, async (req, res) => {
  const { filmId, rating, note, watchedOn, visibility } = req.body;

  try {
    const entry = await prisma.journalEntry.create({
      data: {
        userId: req.user.id,
        filmId,
        rating:  rating != null ? parseInt(rating, 10) : null,
        note,
        watchedOn: watchedOn ? new Date(watchedOn) : null,
        visibility,
      },
    });

    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create journal entry" });
  }
});

// PATCH /journals/:id/visibility  (owner only)
router.patch("/:id/visibility", requireAuth, async (req, res) => {
  const entryId = parseInt(req.params.id, 10);
  const { visibility } = req.body;

  if (isNaN(entryId)) {
    return res.status(400).json({ error: "Invalid entry id" });
  }

  if (!["PRIVATE", "PUBLIC"].includes(visibility)) {
    return res.status(400).json({ error: "Invalid visibility value" });
  }

  try {
    const entry = await prisma.journalEntry.findUnique({
      where: { id: entryId },
    });

    if (!entry || entry.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updated = await prisma.journalEntry.update({
      where: { id: entryId },
      data: { visibility },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update visibility" });
  }
});


//edit journal entry
router.put("/:id", requireAuth, async (req, res) => {
  const entryId = parseInt(req.params.id, 10);
  const { rating, note, watchedOn, visibility } = req.body;

  if (isNaN(entryId)) {
    return res.status(400).json({ error: "Invalid entry id" });
  }

  try {
    // Ensure entry belongs to user
    const existing = await prisma.journalEntry.findUnique({
      where: { id: entryId },
    });

    if (!existing || existing.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updated = await prisma.journalEntry.update({
      where: { id: entryId },
      data: {
        rating: rating != null ? parseInt(rating, 10) : null,
        note,
        watchedOn: watchedOn ? new Date(watchedOn) : null,
        visibility,
      },
      include: { film: true }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update journal entry" });
  }
});

// DELETE /journal/:id
router.delete("/:id", requireAuth, async (req, res) => {
  const entryId = parseInt(req.params.id, 10);

  if (isNaN(entryId)) {
    return res.status(400).json({ error: "Invalid entry id" });
  }

  try {
    const existing = await prisma.journalEntry.findUnique({
      where: { id: entryId },
    });

    if (!existing || existing.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.journalEntry.delete({
      where: { id: entryId },
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete journal entry" });
  }
});

module.exports = router;