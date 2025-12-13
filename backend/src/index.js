const express = require("express");
const cors = require("cors");
const prisma = require("./db");
const bcrypt = require("bcrypt");
const { generateToken, authMiddleware } = require("./auth");
const journalRoutes = require("./routes/journal");


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post("/auth/register", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already used" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, passwordHash, displayName },
    });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "backend" });
});

// GET /films?country=&year=&search=&mood=&festival=&era=&search=
app.get("/films", async (req, res) => {
  try {
    const { country, year, search, mood, festival, era } = req.query;

    const where = {};

    if (country) {
      where.country = { contains: country, mode: "insensitive" };
    }

    if (year) {
      const parsedYear = parseInt(year, 10);
      if (!isNaN(parsedYear)) where.year = parsedYear;
    }

    if (mood) {
      where.moods = { contains: mood, mode: "insensitive" };
    }

    if (festival) {
      where.festival = { contains: festival, mode: "insensitive" };
    }

    if (era) {
      where.era = { contains: era, mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { director: { contains: search, mode: "insensitive" } },
      ];
    }

    const films = await prisma.film.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(films);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /films/:id
app.get("/films/:id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});


app.use("/journal", authMiddleware, journalRoutes);

app.post("/journal", authMiddleware, async (req, res) => {
  const { filmId, rating, note, watchedOn } = req.body;

  try {
    const entry = await prisma.journalEntry.create({
      data: {
        userId: req.user.id,
        filmId,
        rating,
        note,
        watchedOn: watchedOn ? new Date(watchedOn) : null,
        visibility: "private",
      },
    });

    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create journal entry" });
  }
});

app.get("/journal", authMiddleware, async (req, res) => {
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

//edit journal entry
app.put("/journal/:id", authMiddleware, async (req, res) => {
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
        rating,
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
app.delete("/journal/:id", authMiddleware, async (req, res) => {
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

