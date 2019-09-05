const Product = require("../models/product");
const Cart = require("../models/cart");

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

const getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render("shop/product-detail", {
            path: `/products`,
            pageTitle: product.title,
            product
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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if (cartProductData)
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
            }
            res.render("shop/cart.ejs", {
                pageTitle: "Cart",
                path: "/cart",
                products: cartProducts
            });
        });
    });
};

const postCart = (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price);
    });

    res.redirect("/cart");
};

const deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price);
        res.redirect("/cart");
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
    getProduct,
    getIndex,
    getCart,
    postCart,
    getCheckout,
    getOrders,
    deleteCartItem
};
