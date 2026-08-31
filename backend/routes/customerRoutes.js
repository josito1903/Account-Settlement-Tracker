const express = require("express");
const router = express.Router();

const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
} = require("../controllers/customerController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Routes
router.post("/", authMiddleware, adminMiddleware, createCustomer);

router.get("/", authMiddleware, getCustomers);

router.get("/:id", authMiddleware, getCustomerById);

router.put("/:id", authMiddleware, adminMiddleware, updateCustomer);

router.delete("/:id", authMiddleware, adminMiddleware, deleteCustomer);

module.exports = router;