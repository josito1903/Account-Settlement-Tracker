const Vendor = require("../models/Vendor");

// Create Vendor
exports.createVendor = async(req, res) => {
    try {
        const vendor = await Vendor.create(req.body);

        res.status(201).json({
            success: true,
            message: "Vendor created successfully",
            data: vendor,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Vendors
exports.getVendors = async(req, res) => {
    try {
        const vendors = await Vendor.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: vendors.length,
            data: vendors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Vendor By ID
exports.getVendorById = async(req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }

        res.status(200).json({
            success: true,
            data: vendor,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Vendor
exports.updateVendor = async(req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
                runValidators: true,
            }
        );

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Vendor updated successfully",
            data: vendor,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Vendor
exports.deleteVendor = async(req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Vendor deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};