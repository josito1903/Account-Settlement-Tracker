const User = require("../models/User");

// Get all users
exports.getUsers = async(req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get user by ID
exports.getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update user
exports.updateUser = async(req, res) => {
    try {
        const { fullName, phoneNumber, role, isActive } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (fullName !== undefined) user.fullName = fullName;
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
        if (role !== undefined) user.role = role;
        if (isActive !== undefined) user.isActive = isActive;

        await user.save();

        const safeUser = user.toObject();
        delete safeUser.password;

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: safeUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete user
exports.deleteUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};