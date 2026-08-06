const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to ShopSphere API"
    });
});

module.exports = app;