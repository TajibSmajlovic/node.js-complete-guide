const Product = require("../models/product");
const Order = require("../models/order");

const getProductsPage = (req, res, next) => {
    Product.find()
        .then(products =>
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "Shop",
                path: "/products",
                hasProducts: products.length > 0
            })
        )
        .catch(err => console.error("getProductsPage():", err));
};

const getProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .then(product =>
            res.render("shop/product-detail", {
                path: `/products`,
                pageTitle: product.title,
                product: product
            })
        )
        .catch(err => console.error("getProduct():", err));
};

const getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/"
            });
        })
        .catch(err => console.error("getIndex():", err));
};

const getCart = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .execPopulate()
        .then(user =>
            res.render("shop/cart.ejs", {
                pageTitle: "Cart",
                path: "/cart",
                products: user.cart.items
            })
        )
        .catch(err => console.error("getCart():", err));
};

const postCart = (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId)
        .then(product => req.user.addToCart(product))
        .then(() => res.redirect("/cart"))
        .catch(err => console.error("postCart():", err));
};

const deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;

    req.user
        .removeFromCart(productId)
        .then(() => res.redirect("/cart"))
        .catch(err => console.error("deleteCartItems():", err));
};

const getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout"
    });
};

const postOrder = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return {
                    quantity: i.quantity,
                    product: { ...i.productId._doc }
                };
            });
            const order = new Order({
                user: {
                    name: req.user.username,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(() => req.user.clearCart())
        .then(() => res.redirect("/orders"))
        .catch(err => console.error("postOrder():", err));
};

const getOrders = (req, res, next) => {
    Order.find({ "user.userId": req.user._id })
        .then(orders =>
            res.render("shop/orders", {
                pageTitle: "Orders",
                path: "/orders",
                orders: orders
            })
        )
        .catch(err => console.error("getOrders():", err));
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
