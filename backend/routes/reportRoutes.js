const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getDashboardReport,
    getRevenueReport,
    getCustomerReport,
    getVendorReport,
    getSettlementReport,
} = require("../controllers/reportController");

router.get(
    "/dashboard",
    authMiddleware,
    getDashboardReport
);

router.get(
    "/revenue",
    authMiddleware,
    getRevenueReport
);

router.get(
    "/customers",
    authMiddleware,
    getCustomerReport
);

router.get(
    "/vendors",
    authMiddleware,
    getVendorReport
);

router.get(
    "/settlements",
    authMiddleware,
    getSettlementReport
);

module.exports = router;