const express = require("express");

const router = express.Router();

const {
    getProductsPage,
    getIndex,
    getCart,
    getCheckout,
    getOrders
} = require("../controllers/shop");

router.get("/", getIndex);
router.get("/products", getProductsPage);
router.get("/cart", getCart);
router.get("/checkout", getCheckout);
router.get("/orders", getOrders);

module.exports = {
    shopRoutes: router
};
