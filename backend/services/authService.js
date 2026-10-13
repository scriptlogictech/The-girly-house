
const User = require("../models/User");
const Notification = require("../models/Notification");
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
    throw new Error("Please verify your email address first.");
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
  if (!user.emailOtpExpiry || user.emailOtpExpiry < new Date()) {
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

  // Create Admin Notification
  // Notification failure should not prevent successful verification.
  try {
    await Notification.create({
      type: "new_account",
      title: "New Customer Registered",
      message: `${user.name} has verified their email and created an account.`,
      user: user._id,
      isRead: false,
    });
  } catch (notificationError) {
    console.error(
      "Failed to create customer notification:",
      notificationError.message
    );
  }

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




/**
 * Update the authenticated user's profile.
 * Add this function to server/services/authService.js
 */
const updateUserProfile = async (userId, profileData) => {
  const { name, phone, address } = profileData;

  const user = await User.findById(userId);

  if (!user || user.status !== "active") {
    throw new Error("User account not found or inactive");
  }

  // Update name
  if (typeof name === "string") {
    if (!name.trim()) {
      throw new Error("Name is required");
    }

    user.name = name.trim();
  }

  // Update phone only if it is different
  if (typeof phone === "string") {
    const normalizedPhone = phone.trim();

    if (!normalizedPhone) {
      throw new Error("Phone number is required");
    }

    if (normalizedPhone !== user.phone) {
      const existingPhone = await User.findOne({
        phone: normalizedPhone,
        _id: { $ne: user._id },
      });

      if (existingPhone) {
        throw new Error("Phone number already exists");
      }

      user.phone = normalizedPhone;
    }
  }

  // Update the default address only when all required fields are provided.
  if (address !== undefined) {
    const requiredFields = [
      "fullName",
      "phone",
      "house",
      "street",
      "city",
      "state",
      "pincode",
    ];

    if (
      !address ||
      typeof address !== "object" ||
      Array.isArray(address) ||
      requiredFields.some(
        (field) =>
          typeof address[field] !== "string" ||
          !address[field].trim()
      )
    ) {
      throw new Error(
        "Please provide the full address: name, phone, house, street, city, state and pincode."
      );
    }

    const addressData = {
      fullName: address.fullName.trim(),
      phone: address.phone.trim(),
      house: address.house.trim(),
      street: address.street.trim(),
      landmark: (address.landmark || "").trim(),
      city: address.city.trim(),
      state: address.state.trim(),
      pincode: address.pincode.trim(),
      country: (address.country || "India").trim(),
      addressType: ["home", "work", "other"].includes(
        address.addressType
      )
        ? address.addressType
        : "home",
      isDefault: true,
    };

    const defaultAddress = user.addresses.find(
      (item) => item.isDefault
    );

    if (defaultAddress) {
      Object.assign(defaultAddress, addressData);
    } else {
      user.addresses.push(addressData);
    }
  }

  await user.save();

  return {
    success: true,
    message: "Profile updated successfully",
    user: {
      id: user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      addresses: user.addresses,
    },
  };
};


module.exports = {
  registerUser,
  loginUser,
  verifyEmailOtp,
  updateUserProfile,
};