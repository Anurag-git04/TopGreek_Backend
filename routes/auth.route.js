const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

router.post("/sign", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      skills,
      seniority,
      maxCapacity,
      department,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      skills,
      seniority,
      maxCapacity,
      department,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//  Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

module.exports = router;
