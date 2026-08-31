const mongoose = require("mongoose");

const settlementSchema = new mongoose.Schema({
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
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

    totalAmount: {
        type: Number,
        required: true,
    },

    paidAmount: {
        type: Number,
        default: 0,
    },

    remainingAmount: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ["Pending", "Partial", "Completed"],
        default: "Pending",
    },

    settlementDate: {
        type: Date,
        default: Date.now,
    },

    remarks: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Settlement", settlementSchema);