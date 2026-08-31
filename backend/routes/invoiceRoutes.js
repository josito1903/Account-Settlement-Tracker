const express = require("express");
const router = express.Router();

const {
    createInvoice,
    getInvoices,
    getMyInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
} = require("../controllers/invoiceController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ================= ADMIN =================

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createInvoice
);

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getInvoices
);

// ================= USER =================

// IMPORTANT: This MUST come before /:id
router.get(
    "/my-invoices",
    authMiddleware,
    getMyInvoices
);

// ================= SINGLE INVOICE =================

router.get(
    "/:id",
    authMiddleware,
    getInvoiceById
);

// ================= ADMIN UPDATE / DELETE =================

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateInvoice
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteInvoice
);

module.exports = router;