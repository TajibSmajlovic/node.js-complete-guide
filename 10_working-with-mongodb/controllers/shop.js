const Product = require("../models/product");

const getProductsPage = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "Shop",
                path: "/products",
                hasProducts: products.length > 0
            });
        })
        .catch(err => console.log(err));
};

const getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            res.render("shop/product-detail", {
                path: `/products`,
                pageTitle: product.title,
                product: product
            });
        })
        .catch(err => console.log(err));
};

const getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/"
            });
        })
        .catch(err => console.log(err));
};

const getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products =>
            res.render("shop/cart.ejs", {
                pageTitle: "Cart",
                path: "/cart",
                products: products
            })
        )
        .catch(err => console.log(err));
};

const postCart = (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId)
        .then(product => req.user.addToCart(product))
        .then(() => res.redirect("/cart"))
        .catch(err => console.log(err));
};

const deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;

    req.user
        .deleteItemFromCart(productId)
        .then(() => res.redirect("/cart"))
        .catch(err => console.log(err));
};

const getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout"
    });
};

const postOrder = (req, res, next) => {
    req.user
        .addOrder()
        .then(() => {})
        .catch(err => console.log(err));
};

const getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders =>
            res.render("shop/orders", {
                pageTitle: "Orders",
                path: "/orders",
                orders: orders
            })
        )
        .catch(err => console.log(err));
};

module.exports = {
    getProductsPage,
    getProduct,
    getIndex,
    getCart,
    postCart,
    getCheckout,
    getOrders,
    deleteCartItem,
    postOrder
};
