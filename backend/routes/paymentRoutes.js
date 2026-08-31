const express = require("express");
const router = express.Router();

const {
    createPayment,
    getPayments,
    getPaymentById,
    getMyPayments,
    updatePayment,
    deletePayment,
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createPayment
);

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getPayments
);

// Logged-in user
router.get(
    "/my-payments",
    authMiddleware,
    getMyPayments
);

// Single payment
router.get(
    "/:id",
    authMiddleware,
    getPaymentById
);

// Admin
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updatePayment
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deletePayment
);

module.exports = router;