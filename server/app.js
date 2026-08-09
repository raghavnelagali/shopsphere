const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const errorHandler = require("./src/middlewares/errorHandler");

dotenv.config();

const apiRoutes = require("./src/routes");

const app = express();

app.use(cors());

// Normal JSON APIs
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", apiRoutes);

app.use(errorHandler);

module.exports = app;