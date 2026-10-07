const settingsService = require("../services/settingsService");

// ==========================================
// GET SETTINGS
// ==========================================

const getSettings = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await settingsService.getSettings();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// UPDATE SETTINGS
// ==========================================

const updateSettings = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await settingsService.updateSettings(
        req.body
      );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
};