const express = require("express");

const router = express.Router();

const {
    getAddProductPage,
    addProduct,
    getProducts
} = require("../controllers/admin");

router.get("/add-product", getAddProductPage);
router.get("/products", getProducts);

router.post("/add-product", addProduct);

module.exports = {
    adminRoutes: router
};
