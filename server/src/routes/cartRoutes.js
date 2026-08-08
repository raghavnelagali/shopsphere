const express = require("express");

const router = express.Router();

const protect = require("../middlewares/protect");

const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
} = require("../controllers/cartController");

router.post("/", protect, addToCart);

router.get("/", protect, getCart);

router.put(
    "/:productId",
    protect,
    updateCart
);

router.delete(
    "/:productId",
    protect,
    removeFromCart
);

module.exports = router;