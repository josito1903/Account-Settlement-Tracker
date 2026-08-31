const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const Settlement = require("../models/Settlement");

// Dashboard Report
exports.getDashboardReport = async(req, res) => {
    try {
        const [
            totalCustomers,
            totalVendors,
            totalInvoices,
            totalPayments,
            totalSettlements,
            pendingInvoices,
            completedSettlements,
        ] = await Promise.all([
            Customer.countDocuments(),
            Vendor.countDocuments(),
            Invoice.countDocuments(),
            Payment.countDocuments(),
            Settlement.countDocuments(),
            Invoice.countDocuments({ status: "Pending" }),
            Settlement.countDocuments({ status: "Completed" }),
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalCustomers,
                totalVendors,
                totalInvoices,
                totalPayments,
                totalSettlements,
                pendingInvoices,
                completedSettlements,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Revenue Report
exports.getRevenueReport = async(req, res) => {
    try {
        const result = await Payment.aggregate([{
                $group: {
                    _id: {
                        year: { $year: "$paymentDate" },
                        month: { $month: "$paymentDate" },
                    },
                    totalRevenue: { $sum: "$amount" },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Customer Report
exports.getCustomerReport = async(req, res) => {
    try {
        const customers = await Customer.find()
            .select(
                "customerName companyName outstandingBalance status"
            )
            .sort({ outstandingBalance: -1 });

        res.status(200).json({
            success: true,
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Vendor Report
exports.getVendorReport = async(req, res) => {
    try {
        const vendors = await Vendor.find()
            .select(
                "vendorName companyName payableAmount status"
            )
            .sort({ payableAmount: -1 });

        res.status(200).json({
            success: true,
            data: vendors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Settlement Report
exports.getSettlementReport = async(req, res) => {
    try {
        const result = await Settlement.aggregate([{
            $group: {
                _id: "$status",
                count: { $sum: 1 },
                totalAmount: { $sum: "$totalAmount" },
                paidAmount: { $sum: "$paidAmount" },
                remainingAmount: {
                    $sum: "$remainingAmount",
                },
            },
        }, ]);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};