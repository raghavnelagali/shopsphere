const express = require("express");

const router = express.Router();

const protect = require("../middlewares/protect");
const admin = require("../middlewares/admin");

const {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", protect, placeOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.put(
    "/:id/status",
    protect,
    admin,
    updateOrderStatus
);

module.exports = router;