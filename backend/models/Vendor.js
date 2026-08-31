const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: true,
        trim: true,
    },

    companyName: {
        type: String,
        default: "",
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    phone: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        default: "",
    },

    payableAmount: {
        type: Number,
        default: 0,
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Vendor", vendorSchema);