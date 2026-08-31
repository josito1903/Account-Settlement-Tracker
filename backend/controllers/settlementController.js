const Settlement = require("../models/Settlement");
const Invoice = require("../models/Invoice");

// ======================================================
// CREATE SETTLEMENT - ADMIN
// ======================================================
exports.createSettlement = async(req, res) => {
    try {
        const {
            invoice,
            settlementDate,
            remarks,
        } = req.body;

        if (!invoice) {
            return res.status(400).json({
                success: false,
                message: "Invoice is required",
            });
        }

        const invoiceRecord = await Invoice.findById(invoice)
            .populate("customer")
            .populate("vendor");

        if (!invoiceRecord) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        const totalAmount = Number(
            invoiceRecord.totalAmount || 0
        );

        const paidAmount = Number(
            invoiceRecord.paidAmount || 0
        );

        const remainingAmount = Math.max(
            totalAmount - paidAmount,
            0
        );

        let status = "Pending";

        if (remainingAmount === 0 && totalAmount > 0) {
            status = "Completed";
        } else if (paidAmount > 0) {
            status = "Partial";
        }

        const settlement = await Settlement.create({
            invoice: invoiceRecord._id,
            customer: invoiceRecord.customer._id,
            vendor: invoiceRecord.vendor._id,
            totalAmount,
            paidAmount,
            remainingAmount,
            status,
            settlementDate,
            remarks: remarks || "",
        });

        const populatedSettlement =
            await Settlement.findById(settlement._id)
            .populate("invoice")
            .populate("customer")
            .populate("vendor");

        res.status(201).json({
            success: true,
            message: "Settlement created successfully",
            data: populatedSettlement,
        });
    } catch (error) {
        console.error(
            "Create settlement error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// GET ALL SETTLEMENTS - ADMIN
// ======================================================
exports.getSettlements = async(req, res) => {
    try {
        const settlements = await Settlement.find()
            .populate("invoice")
            .populate("customer")
            .populate("vendor")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: settlements.length,
            data: settlements,
        });
    } catch (error) {
        console.error(
            "Get settlements error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// GET LOGGED-IN USER'S SETTLEMENTS
// ======================================================
exports.getMySettlements = async(req, res) => {
    try {
        const settlements = await Settlement.find()
            .populate({
                path: "invoice",
                match: {
                    user: req.user.id,
                },
                populate: [{
                        path: "customer",
                    },
                    {
                        path: "vendor",
                    },
                ],
            })
            .populate("customer")
            .populate("vendor")
            .sort({ createdAt: -1 });

        const mySettlements = settlements.filter(
            (settlement) =>
            settlement.invoice !== null
        );

        res.status(200).json({
            success: true,
            count: mySettlements.length,
            data: mySettlements,
        });
    } catch (error) {
        console.error(
            "Get my settlements error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// GET SETTLEMENT BY ID
// ======================================================
exports.getSettlementById = async(req, res) => {
    try {
        const settlement =
            await Settlement.findById(req.params.id)
            .populate("invoice")
            .populate("customer")
            .populate("vendor");

        if (!settlement) {
            return res.status(404).json({
                success: false,
                message: "Settlement not found",
            });
        }

        res.status(200).json({
            success: true,
            data: settlement,
        });
    } catch (error) {
        console.error(
            "Get settlement by ID error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// UPDATE SETTLEMENT - ADMIN
// ======================================================
exports.updateSettlement = async(req, res) => {
    try {
        const settlement =
            await Settlement.findById(req.params.id);

        if (!settlement) {
            return res.status(404).json({
                success: false,
                message: "Settlement not found",
            });
        }

        const invoiceId =
            req.body.invoice || settlement.invoice;

        const invoiceRecord =
            await Invoice.findById(invoiceId)
            .populate("customer")
            .populate("vendor");

        if (!invoiceRecord) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        const totalAmount =
            Number(invoiceRecord.totalAmount || 0);

        const paidAmount =
            Number(invoiceRecord.paidAmount || 0);

        const remainingAmount = Math.max(
            totalAmount - paidAmount,
            0
        );

        let status = "Pending";

        if (remainingAmount === 0 && totalAmount > 0) {
            status = "Completed";
        } else if (paidAmount > 0) {
            status = "Partial";
        }

        settlement.invoice = invoiceRecord._id;

        settlement.customer =
            invoiceRecord.customer ?
            invoiceRecord.customer._id :
            null;

        settlement.vendor =
            invoiceRecord.vendor ?
            invoiceRecord.vendor._id :
            null;

        settlement.totalAmount = totalAmount;
        settlement.paidAmount = paidAmount;
        settlement.remainingAmount = remainingAmount;
        settlement.status = status;

        if (req.body.settlementDate !== undefined) {
            settlement.settlementDate =
                req.body.settlementDate;
        }

        if (req.body.remarks !== undefined) {
            settlement.remarks = req.body.remarks;
        }

        await settlement.save();

        const updatedSettlement =
            await Settlement.findById(settlement._id)
            .populate("invoice")
            .populate("customer")
            .populate("vendor");

        res.status(200).json({
            success: true,
            message: "Settlement updated successfully",
            data: updatedSettlement,
        });
    } catch (error) {
        console.error(
            "Update settlement error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// DELETE SETTLEMENT - ADMIN
// ======================================================
exports.deleteSettlement = async(req, res) => {
    try {
        const settlement =
            await Settlement.findByIdAndDelete(
                req.params.id
            );

        if (!settlement) {
            return res.status(404).json({
                success: false,
                message: "Settlement not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Settlement deleted successfully",
        });
    } catch (error) {
        console.error(
            "Delete settlement error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};