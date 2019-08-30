const fs = require("fs");
const path = require("path");
const myPath = require("../utils/path");

const productsDataPath = path.join(myPath, "data", "products.json");

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        Product.fetchAll(products => {
            products.push(this);
            fs.writeFile(productsDataPath, JSON.stringify(products), err => {});
            fs.readFile(productsDataPath, (err, pro) => {});
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
};
