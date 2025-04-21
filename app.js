
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session'); // allows users to stay logged in across ages 
const MongoStore = require('connect-mongoose');
const dotenv = require('dotenv'); // loads variable from .env
const path = require('path');
const authRoutes = require("./routes/auth");
const boardRoutes = require("./routes/boards");
const isAuthenticated = require('./middleware/auth');

dotenv.config();

const app = express();

// connecting to mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('connected to MongoDB'))
.catch((err) => console.error('Mongo Error:', err));

//middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// renders .ejs files with embedded JS in HTML
app.set('view engine', 'ejs'); 

// Session
app.use(session({
    secret: process.env.SESSION_SECRET, //ID Cookie
    resave: false, // avoids saving if nothing changes
    saveUninitialized: false, // avoids saving empty sessions
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // saves sessions to database
    cookie: { maxAge: 1000 * 60 * 24 } //session expires after 1day
}));

// routes
app.use('/', require('./routes/main'));
app.use("/auth", authRoutes); // authentication route
app.use("/boards", boardRoutes); // boards routes
// Home route
app.get("/", (req, res) => {
    res.send("Welcome to MyAstralSpace");
  });

  //making dashboard visible for logged-in users
app.get('/dashboard' , isAuthenticated, async (req, res) => {
    const user = await User.findById(req.session.userID); 
    res.render('dashboard', { user });
});

app.get('/quoteGenerator', (req, res) => {
    res.render('quoteGenerator'); // looks in views/quoteGenerator.ejs
  });

  app.get('/affirmations', (req, res) => {
    res.render('affirmations');
  });
  


// start server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));


