const express = require("express");
const prisma = require("../db");
const router = express.Router();
const { requireAuth } = require("../auth");

router.get("/", requireAuth, async (req, res) => {
  try {
    console.log("req.user:", req.user);
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        displayName: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;