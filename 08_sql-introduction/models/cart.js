const fs = require("fs");
const path = require("path");

const myPath = require("../utils/path");

const cartDataPath = path.join(myPath, "data", "cart.json");

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(cartDataPath, (err, data) => {
            let cart = { products: [], totalPrice: 0 };

            if (!err) {
                cart = JSON.parse(data);
            }

            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += +productPrice;

            fs.writeFile(cartDataPath, JSON.stringify(cart), err => {});
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(cartDataPath, (err, data) => {
            if (err) return;
            const updatedCart = { ...JSON.parse(data) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) return;
            const productQty = product.qty;

            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            );
            updatedCart.totalPrice -= productPrice * productQty;

            fs.writeFile(cartDataPath, JSON.stringify(updatedCart), err => {});
        });
    }

    static getCart(callback) {
        fs.readFile(cartDataPath, (err, data) => {
            const cart = JSON.parse(data);
            err ? callback(null) : callback(cart);
        });
    }
};
