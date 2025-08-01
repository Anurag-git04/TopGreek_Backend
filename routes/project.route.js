const express = require("express");
const router = express.Router();
const Project = require("../models/project.model");

router.post("/projects", async (req, res) => {
  try {
    const {
      name,
      description,
      startDate,
      endDate,
      requiredSkills,
      teamSize,
      status,
      managerId,
    } = req.body;
    if (
      !name ||
      !description ||
      !startDate ||
      !endDate ||
      !status ||
      !managerId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const project = await Project.create({
      name,
      description,
      startDate,
      endDate,
      requiredSkills,
      teamSize,
      status,
      managerId,
    });
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ message: "Projects", projects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json({ message: "Project", project });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
