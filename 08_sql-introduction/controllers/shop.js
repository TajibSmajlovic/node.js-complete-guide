const Product = require("../models/product");
const Cart = require("../models/cart");

const getProductsPage = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render("shop/product-list", {
                prods: rows,
                pageTitle: "Shop",
                path: "/products",
                hasProducts: rows.length > 0
            });
        })
        .catch(err => console.log(err));
};

const getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(([product]) => {
            res.render("shop/product-detail", {
                path: `/products`,
                pageTitle: product[0].title,
                product: product[0]
            });
        })
        .catch(err => console.log(err));
};

const getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render("shop/index", {
                prods: rows,
                pageTitle: "Shop",
                path: "/"
            });
        })
        .catch(err => console.log(err));
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
