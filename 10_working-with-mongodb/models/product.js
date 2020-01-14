const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;
const { getDb } = require("../utils/database");

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOption;

        this._id
            ? (dbOption = db
                  .collection("products")
                  .updateOne({ _id: this._id }, { $set: this }))
            : (dbOption = db.collection("products").insertOne(this));

        return dbOption;
    }

    static fetchAll() {
        const db = getDb();

        return db
            .collection("products")
            .find()
            .toArray();
    }

    static findById(prodId) {
        const db = getDb();

        return db
            .collection("products")
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next();
    }

    static delete(prodId) {
        const db = getDb();

        return db
            .collection("products")
            .deleteOne({ _id: new ObjectId(prodId) });
    }
}

module.exports = Product;
