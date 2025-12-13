const express = require("express");
const cors = require("cors");
const prisma = require("./db");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "backend" });
});

// GET /films?country=&year=&search=
app.get("/films", async (req, res) => {
  try {
    const { country, year, search } = req.query;

    const where = {};

    if (country) {
      where.country = { contains: country, mode: "insensitive" };
    }

    if (year) {
      const parsedYear = parseInt(year, 10);
      if (!isNaN(parsedYear)) {
        where.year = parsedYear;
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { director: { contains: search, mode: "insensitive" } }
      ];
    }

    const films = await prisma.film.findMany({
      where,
      orderBy: { createdAt: "desc" }
    });

    res.json(films);
  } catch (err) {
    console.error("Error fetching films:", err);
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