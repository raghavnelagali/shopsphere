const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ShopSphere API v1",
  });
});


module.exports = router;