const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");  // Import middleware

// Use the middleware protect the route
router.get("/wallpapers", authMiddleware, (req, res) => {
  res.render("wallpapers");  // Only logged-in users access 
});

module.exports = router;
