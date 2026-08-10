const express = require("express");
const upload = require("../middlewares/upload");
const protect = require("../middlewares/protect");
const admin = require("../middlewares/admin");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  getFeaturedProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  createProductValidation,
} = require("../validators/productValidator");

const validate = require("../middlewares/validate");

router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  createProductValidation,
  validate,
  createProduct
);

router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);

router.get("/:id", getProductById);

router.put(
    "/:id",
    protect,
    admin,
    upload.single("image"),
    updateProduct);

router.delete(
    "/:id",
    protect,
    admin,
    deleteProduct);

module.exports = router;