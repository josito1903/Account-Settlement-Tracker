const Invoice = require("../models/Invoice");
const User = require("../models/User");

// Create Invoice
exports.createInvoice = async(req, res) => {
    try {
        const {
            invoiceNumber,
            user,
            customer,
            vendor,
            invoiceDate,
            dueDate,
            totalAmount,
            paidAmount = 0,
            notes = "",
        } = req.body;

        if (!invoiceNumber ||
            !user ||
            !customer ||
            !vendor ||
            !dueDate ||
            totalAmount === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Invoice number, user, customer, vendor, due date and total amount are required",
            });
        }

        const assignedUser = await User.findById(user);

        if (!assignedUser) {
            return res.status(404).json({
                success: false,
                message: "Assigned user not found",
            });
        }

        const total = Number(totalAmount);
        const paid = Number(paidAmount);

        if (total < 0 || paid < 0) {
            return res.status(400).json({
                success: false,
                message: "Amounts cannot be negative",
            });
        }

        if (paid > total) {
            return res.status(400).json({
                success: false,
                message: "Paid amount cannot exceed total amount",
            });
        }

        const balanceAmount = total - paid;

        let status = "Pending";

        if (balanceAmount === 0 && total > 0) {
            status = "Paid";
        } else if (paid > 0) {
            status = "Partial";
        }

        const invoice = await Invoice.create({
            invoiceNumber,
            user,
            customer,
            vendor,
            invoiceDate,
            dueDate,
            totalAmount: total,
            paidAmount: paid,
            balanceAmount,
            status,
            notes,
        });

        const populatedInvoice = await Invoice.findById(invoice._id)
            .populate("user", "fullName email role")
            .populate("customer")
            .populate("vendor");

        res.status(201).json({
            success: true,
            message: "Invoice created successfully",
            data: populatedInvoice,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Invoices - Admin
exports.getInvoices = async(req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate("user", "fullName email role")
            .populate("customer")
            .populate("vendor")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: invoices.length,
            data: invoices,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Logged-in User's Invoices
exports.getMyInvoices = async(req, res) => {
    try {
        const invoices = await Invoice.find({
                user: req.user.id,
            })
            .populate("user", "fullName email role")
            .populate("customer")
            .populate("vendor")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: invoices.length,
            data: invoices,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Invoice By ID
exports.getInvoiceById = async(req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate("user", "fullName email role")
            .populate("customer")
            .populate("vendor");

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        if (
            req.user.role !== "admin" &&
            invoice.user &&
            invoice.user._id.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to view this invoice",
            });
        }

        res.status(200).json({
            success: true,
            data: invoice,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Invoice - Admin
exports.updateInvoice = async(req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        const totalAmount =
            req.body.totalAmount !== undefined ?
            Number(req.body.totalAmount) :
            invoice.totalAmount;

        const paidAmount =
            req.body.paidAmount !== undefined ?
            Number(req.body.paidAmount) :
            invoice.paidAmount;

        if (totalAmount < 0 || paidAmount < 0) {
            return res.status(400).json({
                success: false,
                message: "Amounts cannot be negative",
            });
        }

        if (paidAmount > totalAmount) {
            return res.status(400).json({
                success: false,
                message: "Paid amount cannot exceed total amount",
            });
        }

        const balanceAmount = totalAmount - paidAmount;

        let status = "Pending";

        if (balanceAmount === 0 && totalAmount > 0) {
            status = "Paid";
        } else if (paidAmount > 0) {
            status = "Partial";
        }

        invoice.invoiceNumber =
            req.body.invoiceNumber !== undefined ?
            req.body.invoiceNumber :
            invoice.invoiceNumber;

        invoice.user =
            req.body.user !== undefined ?
            req.body.user :
            invoice.user;

        invoice.customer =
            req.body.customer !== undefined ?
            req.body.customer :
            invoice.customer;

        invoice.vendor =
            req.body.vendor !== undefined ?
            req.body.vendor :
            invoice.vendor;

        invoice.invoiceDate =
            req.body.invoiceDate !== undefined ?
            req.body.invoiceDate :
            invoice.invoiceDate;

        invoice.dueDate =
            req.body.dueDate !== undefined ?
            req.body.dueDate :
            invoice.dueDate;

        invoice.totalAmount = totalAmount;
        invoice.paidAmount = paidAmount;
        invoice.balanceAmount = balanceAmount;
        invoice.status = status;

        invoice.notes =
            req.body.notes !== undefined ?
            req.body.notes :
            invoice.notes;

        await invoice.save();

        const updatedInvoice =
            await Invoice.findById(invoice._id)
            .populate("user", "fullName email role")
            .populate("customer")
            .populate("vendor");

        res.status(200).json({
            success: true,
            message: "Invoice updated successfully",
            data: updatedInvoice,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Invoice - Admin
exports.deleteInvoice = async(req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(
            req.params.id
        );

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Invoice deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};