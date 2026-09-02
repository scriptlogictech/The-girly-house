const express = require("express");
const router = express.Router();

const addressController = require("../controllers/addressController");
const protect = require("../middleware/authMiddleware");

// Add Address
router.post("/", protect, addressController.addAddress);

// Get All Addresses
router.get("/", protect, addressController.getAddresses);

// Update Address
router.put("/:id", protect, addressController.updateAddress);

// Delete Address
router.delete("/:id", protect, addressController.deleteAddress);

// Set Default Address
router.patch("/default/:id", protect, addressController.setDefaultAddress);

module.exports = router;