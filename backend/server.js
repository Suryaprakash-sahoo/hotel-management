const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const userRoutes = require("./src/Routes/UserRoutes.js");
const waiterRoutes = require("./src/Routes/WaiterRoutes.js");
const receptionistRoutes = require("./src/Routes/ReceptionistRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

/* ===================== CORS FIX ===================== */

const allowedOrigins = [
  "http://localhost:5173",
  "https://hotel-management-1-frontend.onrender.com/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests without origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, origin); // 🔥 must return origin
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* ===================== MIDDLEWARE ===================== */

app.use(express.json());
app.use(cookieParser());

/* ===================== ROUTES ===================== */

app.use("/api/user", userRoutes);
app.use("/api/waiter", waiterRoutes);
app.use("/api/receptionist", receptionistRoutes);

/* ===================== TEST ROUTE ===================== */

app.get("/", (req, res) => {
  res.send("Hotel Management System API is running 🚀");
});

/* ===================== DB CONNECTION ===================== */

const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 2,
  retryWrites: true,
  w: "majority",
  connectTimeoutMS: 10000,
};

mongoose
  .connect(MONGO_URI, mongooseOptions)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("⚠️  Make sure MongoDB Atlas IP is whitelisted for Render");
    process.exit(1);
  });

// Connection event listeners
mongoose.connection.on("connected", () => {
  console.log("📡 Mongoose connected to DB");
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️  Mongoose disconnected from DB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err.message);
});

/* ===================== SERVER ===================== */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
