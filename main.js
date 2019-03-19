const express = require('express');
const path = require('path');
// const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const connectDB = require('./server/db/db');
const app = express();
const PORT = process.env.PORT || 8000;

// Connection mongoDB
connectDB();

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
}))

// use logger create
// app.use(morgan("tiny"));

// Use Cors
app.use(cors())


// Use middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Use engine
app.set("view engine", "ejs");

// Load Public Folder
app.use(express.static(path.join(__dirname, "./public")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Change Views Folder convert to templates
app.set("views", path.join(__dirname, "./templates"));

// Use Router
app.use("/", require("./server/router/router"));

// SERVER IS LISTEN
app.listen(PORT, () => console.log(`SERVER IS LISTEN http://localhost:${PORT}`))