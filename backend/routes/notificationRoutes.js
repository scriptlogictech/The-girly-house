
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notificationController");

// All notification routes require admin authentication
router.use(protect, admin);

router.patch("/read-all", markAllAsRead);
router.get("/", getNotifications);
router.patch("/:id/read", markAsRead);

module.exports = router;