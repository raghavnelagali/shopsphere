const Product = require("../models/Product");
const asyncHandler = require("../middlewares/asyncHandler");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");


const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    brand,
    stock,
  } = req.body;

  let images = [];

  if (req.file) {
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "shopsphere/products",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    images.push({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    brand,
    stock,
    images,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

const getProducts = asyncHandler(async (req, res) => {
    const {
        search,
        category,
        brand,
        sort,
        page = 1,
        limit = 10,
    } = req.query;

    const filter = {};

    if (category) filter.category = category;

    if (brand) filter.brand = brand;

    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }

    let sortOption = {};

    if (sort) {
        switch (sort) {
            case "price":
                sortOption.price = 1;
                break;
            case "-price":
                sortOption.price = -1;
                break;
            case "newest":
                sortOption.createdAt = -1;
                break;
        }
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber);

    res.status(200).json({
        success: true,
        totalProducts,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalProducts / limitNumber),
        count: products.length,
        data: products,
    });
});

const mongoose = require("mongoose");

const getProductById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Product ID",
        });
    }

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    res.status(200).json({
        success: true,
        data: product,
    });

});

const updateProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Product ID",
        });
    }

    const product = await Product.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
    });

});

const deleteProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Product ID",
        });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });

});

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};