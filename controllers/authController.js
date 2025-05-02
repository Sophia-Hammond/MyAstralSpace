const User = require('../models/User');

exports.signup_get = (req, res) => {
  res.render('signup'); // Render (EJS)
};

exports.signup_post = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    console.log("User registered:", user);
    res.redirect('/login'); // Or to dashboard if you prefer
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Signup failed.");
  }
};
