const express = require("express");

const router = express.Router();

const { getAddProductPage, addProduct } = require("../controllers/products");

router.get("/add-product", getAddProductPage);

router.post("/add-product", addProduct);

module.exports = {
  adminRoutes: router
};
