const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");

// ======================================================
// GET ALL USERS
// ======================================================

const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    });
});


// ======================================================
// GET USER BY ID
// ======================================================

const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
        .select("-password");

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
});


// ======================================================
// UPDATE USER ROLE
// ======================================================

const updateUserRole = asyncHandler(async (req, res) => {

    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
        return res.status(400).json({
            success: false,
            message: "Invalid role",
        });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    user.role = role;

    await user.save();

    res.status(200).json({
        success: true,
        message: "User role updated successfully",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});


// ======================================================
// DELETE USER
// ======================================================

const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    // Prevent admin from deleting themselves
    if (
        user._id.toString() ===
        req.user._id.toString()
    ) {
        return res.status(400).json({
            success: false,
            message: "You cannot delete your own account",
        });
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});


module.exports = {
    getUsers,
    getUserById,
    updateUserRole,
    deleteUser,
};