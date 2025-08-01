const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    teamSize: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["planning", "active", "completed"],
      default: "planning",
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
