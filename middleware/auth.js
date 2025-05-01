// middleware/auth.js

module.exports = (req, res, next) => {
  if (!req.session.userId) {
    // User is not logged in, redirect to login page
    return res.redirect('/login');
  }
  next(); // User is logged in, continue to the requested route
};

  