const Payment = require("../models/Payment");
const Invoice = require("../models/Invoice");

// Create Payment
exports.createPayment = async(req, res) => {
    try {
        const {
            invoice,
            amount,
            paymentMethod,
            paymentDate,
            transactionId,
            remarks,
        } = req.body;

        if (!invoice || !amount || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Invoice, amount and payment method are required",
            });
        }

        const invoiceRecord = await Invoice.findById(invoice);

        if (!invoiceRecord) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        const paymentAmount = Number(amount);

        if (paymentAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Payment amount must be greater than zero",
            });
        }

        if (paymentAmount > invoiceRecord.balanceAmount) {
            return res.status(400).json({
                success: false,
                message: "Payment amount cannot exceed invoice balance",
            });
        }

        const payment = await Payment.create({
            invoice,
            amount: paymentAmount,
            paymentMethod,
            paymentDate,
            transactionId,
            remarks,
        });

        invoiceRecord.paidAmount += paymentAmount;
        invoiceRecord.balanceAmount =
            invoiceRecord.totalAmount - invoiceRecord.paidAmount;

        if (invoiceRecord.balanceAmount <= 0) {
            invoiceRecord.balanceAmount = 0;
            invoiceRecord.status = "Paid";
        } else if (invoiceRecord.paidAmount > 0) {
            invoiceRecord.status = "Partial";
        } else {
            invoiceRecord.status = "Pending";
        }

        await invoiceRecord.save();

        res.status(201).json({
            success: true,
            message: "Payment recorded successfully",
            data: payment,
            invoice: invoiceRecord,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Payments
exports.getPayments = async(req, res) => {
    try {
        const payments = await Payment.find()
            .populate("invoice")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: payments.length,
            data: payments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Payment By ID
exports.getPaymentById = async(req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate("invoice");

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        res.status(200).json({
            success: true,
            data: payment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Payment
exports.updatePayment = async(req, res) => {
    try {
        const oldPayment = await Payment.findById(req.params.id);

        if (!oldPayment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        const invoice = await Invoice.findById(oldPayment.invoice);

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Related invoice not found",
            });
        }

        const newAmount = Number(req.body.amount);

        if (!newAmount || newAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Payment amount must be greater than zero",
            });
        }

        const paidWithoutOldPayment =
            invoice.paidAmount - oldPayment.amount;

        const newPaidAmount =
            paidWithoutOldPayment + newAmount;

        if (newPaidAmount > invoice.totalAmount) {
            return res.status(400).json({
                success: false,
                message: "Updated payment exceeds invoice total",
            });
        }

        oldPayment.paymentMethod =
            req.body.paymentMethod || oldPayment.paymentMethod;

        oldPayment.paymentDate =
            req.body.paymentDate || oldPayment.paymentDate;

        oldPayment.transactionId =
            req.body.transactionId || oldPayment.transactionId;

        oldPayment.remarks =
            req.body.remarks || oldPayment.remarks;
        await oldPayment.save();

        invoice.paidAmount = newPaidAmount;
        invoice.balanceAmount =
            invoice.totalAmount - newPaidAmount;

        if (invoice.balanceAmount === 0) {
            invoice.status = "Paid";
        } else if (invoice.paidAmount > 0) {
            invoice.status = "Partial";
        } else {
            invoice.status = "Pending";
        }

        await invoice.save();

        res.status(200).json({
            success: true,
            message: "Payment updated successfully",
            data: oldPayment,
            invoice,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Payment
exports.deletePayment = async(req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        const invoice = await Invoice.findById(payment.invoice);

        if (invoice) {
            invoice.paidAmount =
                Math.max(invoice.paidAmount - payment.amount, 0);

            invoice.balanceAmount =
                invoice.totalAmount - invoice.paidAmount;

            if (invoice.balanceAmount === 0) {
                invoice.status = "Paid";
            } else if (invoice.paidAmount > 0) {
                invoice.status = "Partial";
            } else {
                invoice.status = "Pending";
            }

            await invoice.save();
        }

        await payment.deleteOne();

        res.status(200).json({
            success: true,
            message: "Payment deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// // Get logged-in user's payments
exports.getMyPayments = async(req, res) => {
    try {
        const payments = await Payment.find()
            .populate({
                path: "invoice",
                match: { user: req.user.id },
                populate: [{
                        path: "customer",
                    },
                    {
                        path: "vendor",
                    },
                ],
            })
            .sort({ createdAt: -1 });

        // Keep only payments whose invoice belongs to this user
        const myPayments = payments.filter(
            (payment) => payment.invoice !== null
        );

        res.status(200).json({
            success: true,
            count: myPayments.length,
            data: myPayments,
        });
    } catch (error) {
        console.error("Get my payments error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};