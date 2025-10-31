const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://mongo:27017/tasks");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

module.exports = connectDB;
