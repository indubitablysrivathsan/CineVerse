const express = require("express");
const cors = require("cors");
const prisma = require("./db");
const { authMiddleware } = require("./auth");
const signRoutes = require("./routes/sign");
const journalRoutes = require("./routes/journals");
const profileRoutes = require("./routes/profile");
const filmsRoutes = require("./routes/films");
const curatedRoutes = require("./routes/curated");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://cine-verse-lovat.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(authMiddleware);

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "backend" });
});

//sign
app.use("/auth", signRoutes);

//films
app.use("/films", filmsRoutes);

//profile
app.use("/profile", profileRoutes);

//journal
app.use("/journals", journalRoutes);

//curated
app.use("/curated", curatedRoutes);

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});