const express = require("express");
const cors = require("cors");
const prisma = require("./db");
const { authMiddleware } = require("./auth");
const signRoutes = require("./routes/sign");
const journalRoutes = require("./routes/journals");
const profileRoutes = require("./routes/profile")
const filmsRoutes = require("./routes/films")

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
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

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});