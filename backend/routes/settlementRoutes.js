const express = require("express");
const router = express.Router();

const {
    createSettlement,
    getSettlements,
    getSettlementById,
    getMySettlements,
    updateSettlement,
    deleteSettlement,
} = require("../controllers/settlementController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ================= ADMIN =================

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createSettlement
);

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getSettlements
);

// ================= USER =================

router.get(
    "/my-settlements",
    authMiddleware,
    getMySettlements
);

// ================= SINGLE SETTLEMENT =================

router.get(
    "/:id",
    authMiddleware,
    getSettlementById
);

// ================= ADMIN UPDATE/DELETE =================

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateSettlement
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteSettlement
);

module.exports = router;