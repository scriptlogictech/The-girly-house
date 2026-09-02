const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("Name:", err.name);
    console.error("Message:", err.message);
    console.error("Code:", err.code);
    console.error(err);
  }
}

connectDB();