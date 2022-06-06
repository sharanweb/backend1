const express = require("express");
const app = express();
const cors = require("cors");

const productsController = require("./controllers/product.controller");

app.use(cors());
app.use(express.json());

app.use("/products", productsController);

module.exports = app;