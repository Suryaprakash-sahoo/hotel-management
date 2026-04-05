const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");
const cookieParser = require("cookie-parser");

const userRoutes = require("./src/Routes/UserRoutes.js");
const waiterRoutes = require("./src/Routes/WaiterRoutes.js");
const receptionistRoutes = require("./src/Routes/ReceptionistRoutes.js");

env.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Allowed origins
const allowedOrigins = "*";

// ✅ CORS middleware (robust version)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// ✅ Important for preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/waiter", waiterRoutes);
app.use("/api/receptionist", receptionistRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hotel Management System API is running");
});

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
