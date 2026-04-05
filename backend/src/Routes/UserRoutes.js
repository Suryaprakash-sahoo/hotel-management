const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");

const router = express.Router();

/* ===================== USER REGISTER ===================== */

router.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // Check existing username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Password length check
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/* ===================== USER LOGIN ===================== */

router.post("/login", async (req, res) => {
  try {
    console.log("🔥 BODY:", req.body);

    const { email, password } = req.body;

    console.log("🔥 EMAIL:", email);

    const user = await User.findOne({ email });
    console.log("🔥 USER:", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("🔥 PASSWORD MATCH:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (!process.env.JWT_SECRET) {
      console.log("❌ JWT_SECRET missing");
      throw new Error("JWT_SECRET missing");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({ message: "Login success", token });

  } catch (error) {
    console.error("💥 LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/* ===================== USER LOGOUT ===================== */

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
