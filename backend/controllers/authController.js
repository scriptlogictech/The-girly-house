const authService = require("../services/authService");

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



const verifyPhoneOtp = async (req, res) => {
  try {
    const result = await authService.verifyPhoneOtp(req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};



module.exports = {
  register, login, verifyPhoneOtp, getMe,
};