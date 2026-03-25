// import express, cookie-parser & cors middleware
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");

// mount routes
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes")
const statsRoutes = require("./routes/stats.routes")

// create an express application instance
const app = express();

// allow cross-origin api requests (cors)
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL 
];

app.use(cors({
  origin: allowedOrigins, 
  credentials: true
}));

// read json data from requests
app.use(express.json()); 
// read cookies from incoming HTTP requests
app.use(cookieParser()); 

// health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" })
});

// auth endpoints
app.use("/auth", authRoutes);

// task endpoints
app.use("/tasks", taskRoutes)

// stats endpoints
app.use("/stats", statsRoutes)

// export app for server.js
module.exports = app;