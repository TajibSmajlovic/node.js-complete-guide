const express = require("express");

const router = express.Router();

const { getProductsPage } = require("../controllers/products");

router.get("/", getProductsPage);

module.exports = {
  shopRoutes: router
};
