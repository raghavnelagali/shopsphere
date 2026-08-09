const crypto = require("crypto");

const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const razorpay = require("../config/razorpay");


// ======================================================
// PLACE ORDER
// ======================================================

const placeOrder = asyncHandler(async (req, res) => {

    const cartItems = await Cart.find({
        user: req.user._id,
    }).populate("product");

    // Check empty cart
    if (cartItems.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Cart is empty",
        });
    }


    // ==================================================
    // CHECK PRODUCT EXISTENCE AND STOCK
    // ==================================================

    for (const item of cartItems) {

        // Product may have been deleted
        if (!item.product) {
            return res.status(400).json({
                success: false,
                message:
                    "A product in your cart no longer exists",
            });
        }

        // Check current stock
        if (item.quantity > item.product.stock) {
            return res.status(400).json({
                success: false,
                message:
                    `${item.product.name} has only ` +
                    `${item.product.stock} items available`,
            });
        }
    }


    // ==================================================
    // SHIPPING ADDRESS
    // ==================================================

    const {
        fullName,
        mobile,
        address,
        city,
        state,
        pincode,
        country,
    } = req.body;


    // ==================================================
    // CALCULATE TOTAL AND ORDER ITEMS
    // ==================================================

    let totalAmount = 0;

    const orderItems = cartItems.map((item) => {

        const itemTotal =
            item.product.price *
            item.quantity;

        totalAmount += itemTotal;

        return {
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        };
    });


    // ==================================================
    // CREATE ORDER
    // ==================================================

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


    // ==================================================
    // REDUCE PRODUCT STOCK
    // ==================================================

    for (const item of cartItems) {

        await Product.findByIdAndUpdate(
            item.product._id,
            {
                $inc: {
                    stock: -item.quantity,
                },
            }
        );
    }


    // ==================================================
    // CLEAR CART
    // ==================================================

    await Cart.deleteMany({
        user: req.user._id,
    });


    // ==================================================
    // RESPONSE
    // ==================================================

    res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: order,
    });
});


// ======================================================
// GET MY ORDERS
// ======================================================

const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({
        user: req.user._id,
    })
        .populate(
            "orderItems.product",
            "name images price"
        )
        .sort({
            createdAt: -1,
        });

    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
    });
});


// ======================================================
// GET ORDER BY ID
// ======================================================

const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(
        req.params.id
    )
        .populate("orderItems.product")
        .populate("user", "name email");


    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found",
        });
    }


    // Users can only access their own orders
    // Admin can access any order
    if (
        order.user._id.toString() !==
            req.user._id.toString() &&
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


// ======================================================
// ADMIN - UPDATE ORDER STATUS
// ======================================================

const updateOrderStatus = asyncHandler(
    async (req, res) => {

        const { orderStatus } = req.body;

        const order = await Order.findById(
            req.params.id
        );

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
    }
);


// ======================================================
// CREATE RAZORPAY ORDER
// ======================================================

const createRazorpayOrder = asyncHandler(
    async (req, res) => {

        const { orderId } = req.body;


        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id,
        });


        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }


        if (order.paymentStatus === "Paid") {
            return res.status(400).json({
                success: false,
                message: "Order is already paid",
            });
        }


        const razorpayOrder =
            await razorpay.orders.create({

                amount:
                    Math.round(
                        order.totalAmount * 100
                    ),

                currency: "INR",

                receipt:
                    order._id.toString(),
            });


        order.razorpayOrderId =
            razorpayOrder.id;

        await order.save();


        res.status(201).json({
            success: true,
            message:
                "Razorpay order created",

            data: {
                orderId: order._id,

                razorpayOrderId:
                    razorpayOrder.id,

                amount:
                    razorpayOrder.amount,

                currency:
                    razorpayOrder.currency,

                key:
                    process.env
                        .RAZORPAY_KEY_ID,
            },
        });
    }
);


// ======================================================
// VERIFY RAZORPAY PAYMENT
// ======================================================

const verifyRazorpayPayment =
    asyncHandler(async (req, res) => {

        const {
            orderId,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;


        const order = await Order.findOne({
            _id: orderId,
            user: req.user._id,
        });


        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }


        if (!order.razorpayOrderId) {
            return res.status(400).json({
                success: false,
                message:
                    "Razorpay order not found",
            });
        }


        if (order.paymentStatus === "Paid") {
            return res.status(400).json({
                success: false,
                message:
                    "Order is already paid",
            });
        }


        if (
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Payment verification data is missing",
            });
        }


        // ==============================================
        // CREATE SIGNATURE
        // ==============================================

        const body =
            order.razorpayOrderId +
            "|" +
            razorpay_payment_id;


        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env
                        .RAZORPAY_KEY_SECRET
                )
                .update(body)
                .digest("hex");


        const expectedBuffer =
            Buffer.from(
                expectedSignature,
                "hex"
            );


        const receivedBuffer =
            Buffer.from(
                razorpay_signature,
                "hex"
            );


        // ==============================================
        // VERIFY SIGNATURE
        // ==============================================

        if (
            expectedBuffer.length !==
                receivedBuffer.length ||
            !crypto.timingSafeEqual(
                expectedBuffer,
                receivedBuffer
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid payment signature",
            });
        }


        // ==============================================
        // PAYMENT SUCCESS
        // ==============================================

        order.razorpayPaymentId =
            razorpay_payment_id;

        order.razorpaySignature =
            razorpay_signature;

        order.paymentStatus = "Paid";


        await order.save();


        res.status(200).json({
            success: true,
            message:
                "Payment verified successfully",

            data: {
                orderId: order._id,

                paymentStatus:
                    order.paymentStatus,
            },
        });
    });


// ======================================================
// EXPORTS
// ======================================================

module.exports = {

    placeOrder,

    getMyOrders,

    getOrderById,

    updateOrderStatus,

    createRazorpayOrder,

    verifyRazorpayPayment,
};