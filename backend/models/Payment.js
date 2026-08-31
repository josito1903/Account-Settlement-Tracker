const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    paymentMethod: {
        type: String,
        enum: ["Cash", "Bank Transfer", "UPI", "Cheque"],
        required: true,
    },

    paymentDate: {
        type: Date,
        default: Date.now,
    },

    transactionId: {
        type: String,
        default: "",
    },

    remarks: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Payment", paymentSchema);