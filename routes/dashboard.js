const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

// Protected route for dashboard
router.get("/dashboard", authMiddleware, (req, res) => {
  const user = req.session.userId;
  res.render("dashboard", { user });
});

module.exports = router;
