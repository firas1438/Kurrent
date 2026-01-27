// import express, cookie-parser & cors middleware
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");

// create an express application instance
const app = express();

// allow cross-origin api requests (cors)
app.use(cors({
  origin: ["http://localhost:3000"], 
  credentials: true
}));
app.use(express.json()); // read json data from requests
app.use(cookieParser()); // read cookies from incoming HTTP requests

// health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" })
});

// export app for server.js
module.exports = app;