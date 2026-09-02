const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOTP");

const registerUser = async (userData) => {
  const { name, email, phone, password } = userData;

  // Check if email already exists
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new Error("Email already exists");
  }

  // Check if phone already exists
  const phoneExists = await User.findOne({ phone });

  if (phoneExists) {
    throw new Error("Phone number already exists");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate OTP
  const otp = generateOTP();

  // Hash OTP
  const hashedOtp = await bcrypt.hash(otp, 10);

  // OTP Expiry (5 Minutes)
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  // Create User
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    phoneOtp: hashedOtp,
    phoneOtpExpiry: otpExpiry,
  });

  // Development Only
  console.log("=================================");
  console.log(`OTP for ${phone} : ${otp}`);
  console.log("=================================");

  return {
    success: true,
    message: "User registered successfully. Please verify your phone number using the OTP.",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isPhoneVerified: user.isPhoneVerified,
    },
  };
};

const loginUser = async (userData) => {
  const { email, password } = userData;

  // Find User
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare Password
  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }

  // Check Phone Verification
  if (!user.isPhoneVerified) {
    throw new Error("Please verify your phone number first.");
  }

  // Generate JWT
  const token = generateToken(user);

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};

const verifyPhoneOtp = async (userData) => {
  const { phone, otp } = userData;

  // Find User
  const user = await User.findOne({ phone });

  if (!user) {
    throw new Error("User not found");
  }

  // Check OTP Exists
  if (!user.phoneOtp) {
    throw new Error("OTP not found");
  }

  // Check OTP Expiry
  if (user.phoneOtpExpiry < new Date()) {
    throw new Error("OTP has expired");
  }

  // Compare OTP
  const isOtpMatched = await bcrypt.compare(
    otp,
    user.phoneOtp
  );

  if (!isOtpMatched) {
    throw new Error("Invalid OTP");
  }

  // Mark Phone Verified
  user.isPhoneVerified = true;

  // Clear OTP
  user.phoneOtp = null;
  user.phoneOtpExpiry = null;

  await user.save();

  // Generate JWT
  const token = generateToken(user);

  return {
    success: true,
    message: "Phone verified successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
  verifyPhoneOtp,
};