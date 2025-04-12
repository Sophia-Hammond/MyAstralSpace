module.exports = function requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = isAuthenticated;
  