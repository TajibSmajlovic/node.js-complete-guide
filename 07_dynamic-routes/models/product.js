const fs = require("fs");
const path = require("path");
const myPath = require("../utils/path");

const Cart = require("../models/cart");

const productsDataPath = path.join(myPath, "data", "products.json");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    Product.fetchAll(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          product => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(
          productsDataPath,
          JSON.stringify(updatedProducts),
          err => {}
        );
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(productsDataPath, JSON.stringify(products), err => {});
      }
    });
  }

  static deleteProduct(id) {
    Product.fetchAll(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(p => p.id !== id);
      fs.writeFile(productsDataPath, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(productsDataPath, (err, data) => {
      if (err) {
        return callback([]);
      }
      callback(JSON.parse(data));
    });
  }

  static findById(id, callback) {
    Product.fetchAll(products => {
      const product = products.find(p => p.id === id);
      callback(product);
    });
  }
};
