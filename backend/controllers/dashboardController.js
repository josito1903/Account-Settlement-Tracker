const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const Settlement = require("../models/Settlement");

exports.getDashboardStats = async(req, res) => {
    try {
        const totalCustomers = await Customer.countDocuments();
        const totalVendors = await Vendor.countDocuments();
        const totalInvoices = await Invoice.countDocuments();
        const totalPayments = await Payment.countDocuments();
        const totalSettlements = await Settlement.countDocuments();

        const pendingInvoices = await Invoice.countDocuments({
            status: "Pending",
        });

        const completedSettlements = await Settlement.countDocuments({
            status: "Completed",
        });

        const recentInvoices = await Invoice.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const recentPayments = await Payment.find()
            .sort({ createdAt: -1 })
            .limit(5);

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
                recentInvoices,
                recentPayments,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};