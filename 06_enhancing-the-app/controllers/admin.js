const Product = require("../models/product");

const getAddProductPage = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

const addProduct = (req, res, next) => {
    const product = new Product(
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );
    product.save();
    res.redirect("/");
};

const getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};

module.exports = {
    addProduct,
    getAddProductPage,
    getProducts
};
