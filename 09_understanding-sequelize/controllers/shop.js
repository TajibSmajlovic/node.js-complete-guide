const Product = require("../models/product");

const getProductsPage = (req, res, next) => {
    Product.findAll()
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
    Product.findAll({
        where: {
            id: productId
        }
    })
        .then(product => {
            res.render("shop/product-detail", {
                path: `/products`,
                pageTitle: product[0].title,
                product: product[0]
            });
        })
        .catch(err => console.log(err));
};

const getIndex = (req, res, next) => {
    Product.findAll()
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
        .then(cart => {
            return cart.getProducts().then(products => {
                res.render("shop/cart.ejs", {
                    pageTitle: "Cart",
                    path: "/cart",
                    products: products
                });
            });
        })
        .catch(err => console.log(err));
};

const postCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;

    req.user
        .getCart()
        .then(cart => {
            console.log(cart);
            fetchedCart = cart;
            return cart.getProducts({ where: { id: productId } });
        })
        .then(products => {
            let product;
            let newQuantity = 1;
            products.length > 0 ? (product = products[0]) : "product";
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return fetchedCart.addProduct(product[0], {
                    through: {
                        quantity: newQuantity
                    }
                });
            }
            return Product.findAll({
                where: {
                    id: productId
                }
            }).then(product => {
                return fetchedCart.addProduct(product[0], {
                    through: {
                        quantity: newQuantity
                    }
                });
            });
        })
        .then(() => res.redirect("/cart"));
};

const deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;

    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({
                where: {
                    id: productId
                }
            });
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => res.redirect("/cart"));
};

const getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout"
    });
};

const postOrder = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then(products => {
            return req.user
                .createOrder(order => {
                    return order.addProducts(
                        products.map(product => {
                            product.orderItem = {
                                quantity: product.cartItem.quantity
                            };
                            return product;
                        })
                    );
                })
                .then(result => res.redirect("/orders"));
        })
        .catch(err => console.log(err));
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
    deleteCartItem,
    postOrder
};
