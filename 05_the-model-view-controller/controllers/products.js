const Product = require("../models/product");

const getAddProductPage = (req, res, next) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

const addProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};

const getProductsPage = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};

module.exports = {
    addProduct,
    getAddProductPage,
    getProductsPage
};
