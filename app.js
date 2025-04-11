
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session'); // allows users to stay logged in across ages 
const MongoStore = require('connect-mongoose');
const dotenv = require('dotenv'); // loads variable from .env
const path = require('path');
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);


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
app.set('veiw engine', 'ejs'); 

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

// start server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT`));


