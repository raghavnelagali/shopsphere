const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ShopSphere API v1",
  });
});


module.exports = router;