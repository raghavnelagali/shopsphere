const express = require("express");

const router = express.Router();

const protect = require("../middlewares/protect");
const admin = require("../middlewares/admin");

const {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    createRazorpayOrder,
    verifyRazorpayPayment,
} = require("../controllers/orderController");

router.post("/", protect, placeOrder);

router.get("/my-orders", protect, getMyOrders);

router.post(
    "/payment/create",
    protect,
    createRazorpayOrder
);

router.post(
    "/payment/verify",
    protect,
    verifyRazorpayPayment
);

router.get("/:id", protect, getOrderById);

router.put(
    "/:id/status",
    protect,
    admin,
    updateOrderStatus
);



module.exports = router;