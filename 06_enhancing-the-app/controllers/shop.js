const Product = require("../models/product");

const getProductsPage = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "Shop",
            path: "/products",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};

const getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};

const getCart = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart"
    });
};

const getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout"
    });
};

const getOrders = (req, res, next) => {
    res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders"
    });
};

module.exports = {
    getProductsPage,
    getIndex,
    getCart,
    getCheckout,
    getOrders
};
