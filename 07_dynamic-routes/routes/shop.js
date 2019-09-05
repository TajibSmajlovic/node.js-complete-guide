const express = require("express");

const router = express.Router();

const {
    getProductsPage,
    getProduct,
    getIndex,
    getCart,
    postCart,
    getCheckout,
    getOrders,
    deleteCartItem
} = require("../controllers/shop");

router.get("/", getIndex);
router.get("/products", getProductsPage);
router.get("/products/:productId", getProduct);
router.get("/cart", getCart);
router.get("/checkout", getCheckout);
router.get("/orders", getOrders);

router.post("/cart", postCart);
router.post("/cart-delete-item", deleteCartItem);

module.exports = {
    shopRoutes: router
};
