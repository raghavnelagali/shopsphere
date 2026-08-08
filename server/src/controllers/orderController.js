const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = asyncHandler(async (req, res) => {

    const cartItems = await Cart.find({
        user: req.user._id,
    }).populate("product");

    if (cartItems.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Cart is empty",
        });
    }

    const {
        fullName,
        mobile,
        address,
        city,
        state,
        pincode,
        country,
    } = req.body;

    let totalAmount = 0;

    const orderItems = cartItems.map((item) => {

        totalAmount += item.product.price * item.quantity;

        return {
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        };

    });

    const order = await Order.create({

        user: req.user._id,

        orderItems,

        shippingAddress: {
            fullName,
            mobile,
            address,
            city,
            state,
            pincode,
            country,
        },

        totalAmount,

    });

    await Cart.deleteMany({
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: order,
    });

});

const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({
        user: req.user._id,
    })
        .populate("orderItems.product", "name images price")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
    });

});

const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)
        .populate("orderItems.product")
        .populate("user", "name email");

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found",
        });
    }

    // Users can only access their own orders
    if (
        order.user._id.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
    ) {
        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    }

    res.status(200).json({
        success: true,
        data: order,
    });

});

const updateOrderStatus = asyncHandler(async (req, res) => {

    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found",
        });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json({
        success: true,
        message: "Order updated successfully",
        data: order,
    });

});

module.exports = {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
};