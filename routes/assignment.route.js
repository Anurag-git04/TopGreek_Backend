const express = require("express");
const router = express.Router();
const Assignment = require("../models/assignment.model");

router.post("/assignments", async (req, res) => {
  try {
    const {
      engineerId,
      projectId,
      allocationPercentage,
      startDate,
      endDate,
      role,
    } = req.body;

    if (
      !engineerId ||
      !projectId ||
      !allocationPercentage ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const assignment = await Assignment.create({
      engineerId,
      projectId,
      allocationPercentage,
      startDate,
      endDate,
      role,
    });

    res
      .status(201)
      .json({ message: "Assignment created successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/assignments", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json({ message: "Assignments", assignments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/assignments/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    res.status(200).json({ message: "Assignment", assignment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/assignments/:id", async (req, res) => {
  try {
    const { allocationPercentage, startDate, endDate, role } = req.body;
    if (!allocationPercentage || !startDate || !endDate || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      {
        allocationPercentage,
        startDate,
        endDate,
        role,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Assignment updated successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/assignments/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Assignment deleted successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
