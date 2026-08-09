const asyncHandler = require("../middlewares/asyncHandler");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ======================================================
// ADD TO CART
// ======================================================

const addToCart = asyncHandler(async (req, res) => {

    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    // Validate quantity
    if (quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: "Quantity must be greater than 0",
        });
    }

    // Check requested quantity against stock
    if (quantity > product.stock) {
        return res.status(400).json({
            success: false,
            message: `Only ${product.stock} items available`,
        });
    }

    // Check if product already exists in user's cart
    const existingItem = await Cart.findOne({
        user: req.user._id,
        product: productId,
    });

    if (existingItem) {

        // Calculate new total quantity
        const newQuantity =
            existingItem.quantity + quantity;

        // Check new quantity against stock
        if (newQuantity > product.stock) {
            return res.status(400).json({
                success: false,
                message: `Only ${product.stock} items available`,
            });
        }

        existingItem.quantity = newQuantity;

        await existingItem.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated",
            data: existingItem,
        });
    }

    // Create new cart item
    const cartItem = await Cart.create({
        user: req.user._id,
        product: productId,
        quantity,
    });

    res.status(201).json({
        success: true,
        message: "Product added to cart",
        data: cartItem,
    });
});


// ======================================================
// GET CART
// ======================================================

const getCart = asyncHandler(async (req, res) => {

    const cart = await Cart.find({
        user: req.user._id,
    }).populate(
        "product",
        "name price images stock"
    );

    let total = 0;

    cart.forEach((item) => {

        // Product may have been deleted
        if (item.product) {
            total +=
                item.product.price *
                item.quantity;
        }

    });

    res.status(200).json({
        success: true,
        count: cart.length,
        total,
        data: cart,
    });
});


// ======================================================
// UPDATE CART QUANTITY
// ======================================================

const updateCart = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const { quantity } = req.body;

    // Validate quantity
    if (quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: "Quantity must be greater than 0",
        });
    }

    // Find product
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    // Check stock
    if (quantity > product.stock) {
        return res.status(400).json({
            success: false,
            message: `Only ${product.stock} items available`,
        });
    }

    // Find cart item
    const cartItem = await Cart.findOne({
        user: req.user._id,
        product: productId,
    });

    if (!cartItem) {
        return res.status(404).json({
            success: false,
            message: "Cart item not found",
        });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res.status(200).json({
        success: true,
        message: "Quantity updated",
        data: cartItem,
    });
});


// ======================================================
// REMOVE FROM CART
// ======================================================

const removeFromCart = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const cartItem = await Cart.findOneAndDelete({
        user: req.user._id,
        product: productId,
    });

    if (!cartItem) {
        return res.status(404).json({
            success: false,
            message: "Cart item not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Product removed from cart",
    });
});


// ======================================================
// EXPORTS
// ======================================================

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
};