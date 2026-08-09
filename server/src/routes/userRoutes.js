const express = require("express");

const router = express.Router();

const protect = require("../middlewares/protect");
const admin = require("../middlewares/admin");

const {
    getUsers,
    getUserById,
    updateUserRole,
    deleteUser,
} = require("../controllers/userController");


// Get all users
router.get(
    "/",
    protect,
    admin,
    getUsers
);


// Get user by ID
router.get(
    "/:id",
    protect,
    admin,
    getUserById
);


// Update user role
router.put(
    "/:id/role",
    protect,
    admin,
    updateUserRole
);


// Delete user
router.delete(
    "/:id",
    protect,
    admin,
    deleteUser
);


module.exports = router;