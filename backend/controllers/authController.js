const authService = require("../services/authService");

// ==========================================
// REGISTER USER
// ==========================================

const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// LOGIN USER
// ==========================================

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// VERIFY EMAIL OTP
// ==========================================

const verifyEmailOtp = async (req, res) => {
  try {
    const result = await authService.verifyEmailOtp(req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET CURRENT USER
// ==========================================

const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};




const updateMe = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const result = await authService.updateUserProfile(
      userId,
      req.body
    );

    return res.status(200).json(result);
  } catch (error) {
    const statusCode =
      error.message === "User account not found or inactive"
        ? 404
        : error.message === "Phone number already exists"
        ? 409
        : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Unable to update profile",
    });
  }
};


// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  register,
  login,
  verifyEmailOtp,
  getMe,
  updateMe
};