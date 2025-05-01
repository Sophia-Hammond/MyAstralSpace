const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already in use." });

    const user = new User({ email, password });
    await user.save();

    req.session.userId = user._id;
    res.status(200).json({ message: "Signup successful." });
  } catch (err) {
    res.status(500).json({ error: "Signup failed." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    req.session.userId = user._id;
    res.status(200).json({ message: "Login successful." });
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed." });
    }
    res.status(200).json({ message: "Logged out." });
  });
});

module.exports = router;
