const asyncHandler = require("../middlewares/asyncHandler");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = asyncHandler(async (req, res) => {

    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    const existingItem = await Cart.findOne({
        user: req.user._id,
        product: productId,
    });

    if (existingItem) {

        existingItem.quantity += quantity;

        await existingItem.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated",
            data: existingItem,
        });

    }

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

const getCart = asyncHandler(async (req, res) => {

    const cart = await Cart.find({
        user: req.user._id,
    }).populate(
        "product",
        "name price images stock"
    );

    let total = 0;

    cart.forEach(item => {
        total += item.product.price * item.quantity;
    });

    res.status(200).json({

        success:true,

        count:cart.length,

        total,

        data:cart,

    });

});

const updateCart = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const { quantity } = req.body;

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

const removeFromCart = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const cartItem = await Cart.findOneAndDelete({
        user: req.user._id,
        product: productId,
    });

    if (!cartItem) {
        return res.status(404).json({
            success:false,
            message:"Cart item not found",
        });
    }

    res.status(200).json({
        success:true,
        message:"Product removed from cart",
    });

});

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
};