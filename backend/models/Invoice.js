const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    // User who owns/receives this invoice
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },

    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },

    invoiceDate: {
        type: Date,
        default: Date.now,
    },

    dueDate: {
        type: Date,
        required: true,
    },

    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },

    paidAmount: {
        type: Number,
        default: 0,
        min: 0,
    },

    balanceAmount: {
        type: Number,
        required: true,
        min: 0,
    },

    status: {
        type: String,
        enum: ["Pending", "Partial", "Paid"],
        default: "Pending",
    },

    notes: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Invoice", invoiceSchema);