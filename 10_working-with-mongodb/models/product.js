const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;
const { getDb } = require("../utils/database");

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOption;

        this._id
            ? (dbOption = db
                  .collection("products")
                  .updateOne({ _id: this._id }, { $set: this }))
            : (dbOption = db.collection("products").insertOne({
                  title: this.title,
                  price: this.price,
                  description: this.description,
                  imageUrl: this.imageUrl
              }));

        return dbOption.then(res => {}).catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();

        return db
            .collection("products")
            .find()
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => console.log(err));
    }

    static findById(prodId) {
        const db = getDb();

        return db
            .collection("products")
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(product => product)
            .catch(err => console.log(err));
    }

    static delete(prodId) {
        const db = getDb();

        return db
            .collection("products")
            .deleteOne({ _id: new ObjectId(prodId) })
            .then(res => {})
            .catch(err => console.log(err));
    }
}

module.exports = Product;
