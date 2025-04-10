
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// connecting to mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('connected to MongoDB'))
.catch((err) => console.error('Mongo Error:', err));

//middleware
app.use(express.static(path.join(__dirname, 'public')));

