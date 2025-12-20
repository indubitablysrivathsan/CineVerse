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

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "backend" });
});

//sign
app.use("/auth", authMiddleware, signRoutes);

//films
app.use("/films", authMiddleware, filmsRoutes);

//profile
app.use("/profile", authMiddleware, profileRoutes);

//journal
app.use("/journals", authMiddleware, journalRoutes);

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});