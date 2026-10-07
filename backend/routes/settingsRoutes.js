const express = require("express");

const router = express.Router();

const settingsController = require("../controllers/settingsController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

// ==========================================
// ADMIN SETTINGS
// ==========================================

router.get(
  "/",
  protect,
  authorize("admin"),
  settingsController.getSettings
);

router.put(
  "/",
  protect,
  authorize("admin"),
  settingsController.updateSettings
);

module.exports = router;