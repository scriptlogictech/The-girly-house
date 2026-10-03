const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOTP");
const { sendOtpEmail } = require("./emailService");

// ==========================================
// REGISTER USER
// ==========================================

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

  // Hash OTP before storing in database
  const hashedOtp = await bcrypt.hash(otp, 10);

  // OTP Expiry - 5 Minutes
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  // Create User
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,

    // Email OTP
    emailOtp: hashedOtp,
    emailOtpExpiry: otpExpiry,

    isEmailVerified: false,
  });

  // Send OTP to user's email
  await sendOtpEmail({
    email,
    name,
    otp,
  });

  return {
    success: true,
    message:
      "User registered successfully. Please verify your email address using the OTP.",

    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
  };
};

// ==========================================
// LOGIN USER
// ==========================================

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

  // Check Email Verification
  if (!user.isEmailVerified) {
    throw new Error(
      "Please verify your email address first."
    );
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

// ==========================================
// VERIFY EMAIL OTP
// ==========================================

const verifyEmailOtp = async (userData) => {
  const { email, otp } = userData;

  // Find User
  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check OTP Exists
  if (!user.emailOtp) {
    throw new Error("OTP not found");
  }

  // Check OTP Expiry
  if (
    !user.emailOtpExpiry ||
    user.emailOtpExpiry < new Date()
  ) {
    throw new Error("OTP has expired");
  }

  // Compare OTP
  const isOtpMatched = await bcrypt.compare(
    otp,
    user.emailOtp
  );

  if (!isOtpMatched) {
    throw new Error("Invalid OTP");
  }

  // Mark Email Verified
  user.isEmailVerified = true;

  // Clear OTP after successful verification
  user.emailOtp = null;
  user.emailOtpExpiry = null;

  await user.save();

  // Generate JWT
  const token = generateToken(user);

  return {
    success: true,
    message: "Email verified successfully",

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
  verifyEmailOtp,
};