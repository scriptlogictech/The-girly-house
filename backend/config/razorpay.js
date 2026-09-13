const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "TEMP_KEY_ID",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "TEMP_KEY_SECRET",
});

module.exports = razorpay;