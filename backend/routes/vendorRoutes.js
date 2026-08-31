const express = require("express");
const router = express.Router();

const {
    createVendor,
    getVendors,
    getVendorById,
    updateVendor,
    deleteVendor,
} = require("../controllers/vendorController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, adminMiddleware, createVendor);
router.get("/", authMiddleware, getVendors);
router.get("/:id", authMiddleware, getVendorById);
router.put("/:id", authMiddleware, adminMiddleware, updateVendor);
router.delete("/:id", authMiddleware, adminMiddleware, deleteVendor);

module.exports = router;