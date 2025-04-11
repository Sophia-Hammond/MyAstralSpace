const express = require("express");
const ThoughtBoard = require("../models/ThoughtBoard");
const router = express.Router();

// Create a new thought board
router.post("/create", async (req, res) => {
  const { background, thoughts } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "You must be logged in to create a board." });
  }

  try {
    const newBoard = new ThoughtBoard({
      user: userId,
      thoughts: thoughts,
      background: background,
    });

    await newBoard.save();
    res.status(201).json({ message: "Thought board created successfully", board: newBoard });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all thought boards of a user
router.get("/", async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "You must be logged in to view your boards." });
  }

  try {
    const boards = await ThoughtBoard.find({ user: userId });
    res.status(200).json({ boards: boards });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
