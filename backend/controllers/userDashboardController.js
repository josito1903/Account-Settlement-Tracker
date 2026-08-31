const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const Settlement = require("../models/Settlement");

exports.getMyDashboard = async(req, res) => {
    try {
        const userId = req.user.id;

        const [
            invoices,
            payments,
            settlements,
        ] = await Promise.all([
            Invoice.find({ user: userId }),
            Payment.find({ user: userId }),
            Settlement.find({ user: userId }),
        ]);

        const outstanding = invoices.reduce(
            (total, invoice) =>
            total + Number(invoice.balanceAmount || 0),
            0
        );

        res.status(200).json({
            success: true,
            data: {
                invoiceCount: invoices.length,
                paymentCount: payments.length,
                settlementCount: settlements.length,
                outstanding,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};