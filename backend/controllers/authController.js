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

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  register,
  login,
  verifyEmailOtp,
  getMe,
};