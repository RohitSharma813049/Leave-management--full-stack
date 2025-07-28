const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/my-leave-management");
    console.log("MongoDB connected to My Leave Management Database");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Call the function immediately
connectDB();

module.exports = connectDB;
