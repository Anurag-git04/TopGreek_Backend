const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/engineer", async (req, res) => {
  try {
    const engineers = await User.find({ role: "engineer" });
    res.status(200).json({ message: "Engineers", engineers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/manager", async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" });
    res.status(200).json({ message: "Managers", managers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/engineer/:id", async (req, res) => {
  try {
    const engineer = await User.findById(req.params.id);
    res.status(200).json({ message: "Engineer", engineer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/manager/:id", async (req, res) => {
  try {
    const engineer = await User.findById(req.params.id);
    res.status(200).json({ message: "Engineer", engineer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
