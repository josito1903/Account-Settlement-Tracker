const Customer = require("../models/Customer");

// Create Customer
exports.createCustomer = async(req, res) => {
    try {
        const customer = await Customer.create(req.body);

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: customer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Customers
exports.getCustomers = async(req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Customer By ID
exports.getCustomerById = async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            data: customer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Customer
exports.updateCustomer = async(req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true, runValidators: true }
        );

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: customer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Customer
exports.deleteCustomer = async(req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};