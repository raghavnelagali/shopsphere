const express = require("express");
const upload = require("../middlewares/upload");
const protect = require("../middlewares/protect");
const admin = require("../middlewares/admin");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
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

router.get("/:id", getProductById);

router.put(
    "/:id",
    protect,
    admin,
    updateProduct);

router.delete(
    "/:id",
    protect,
    admin,
    deleteProduct);

module.exports = router;