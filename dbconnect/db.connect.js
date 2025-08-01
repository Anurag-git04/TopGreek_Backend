const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo DB is Connected Successfully");
  } catch (error) {
    console.log("Error in connecting to Mongo DB:", error);
  }
};

module.exports = connectDB;
