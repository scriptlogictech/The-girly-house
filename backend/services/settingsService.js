const Settings = require("../models/Settings");

// ==========================================
// GET SETTINGS
// ==========================================

const getSettings = async () => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  return {
    success: true,
    data: settings,
  };
};

// ==========================================
// UPDATE SETTINGS
// ==========================================

const updateSettings = async (settingsData) => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = new Settings();
  }

  const allowedFields = [
    "storeName",
    "storeDescription",
    "contactEmail",
    "contactPhone",
    "address",
    "currency",
    "freeShippingThreshold",
    "shippingCharge",
    "enableCOD",
    "enableRazorpay",
    "allowOrderCancellation",
    "cancellationTimeLimit",
  ];

  allowedFields.forEach((field) => {
    if (settingsData[field] !== undefined) {
      settings[field] = settingsData[field];
    }
  });

  await settings.save();

  return {
    success: true,
    message: "Settings updated successfully.",
    data: settings,
  };
};

module.exports = {
  getSettings,
  updateSettings,
};