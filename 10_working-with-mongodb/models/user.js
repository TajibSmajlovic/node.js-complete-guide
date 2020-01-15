const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;
const { getDb } = require("../utils/database");

class User {
    constructor(username, password, cart, _id) {
        this.username = username;
        this.password = password;
        this.cart = cart;
        this._id = _id;
    }

    save() {
        const db = getDb();

        return db.collection("users").insertOne(this);
    }

    addToCart(product) {
        const db = getDb();
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        const cartProductIndex = this.cart.items.findIndex(
            cp => cp.productId.toString() === product._id.toString()
        );

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const updatedCart = {
            items: updatedCartItems
        };

        return db
            .collection("users")
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            );
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => i.productId);

        return db
            .collection("products")
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products =>
                products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(
                            i => i.productId.toString() === p._id.toString()
                        ).quantity
                    };
                })
            );
    }

    deleteItemFromCart = productId => {
        const db = getDb();
        const updatedCartItems = this.cart.items.filter(
            item => item.productId.toString() !== productId.toString()
        );

        return db
            .collection("users")
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: { items: updatedCartItems } } }
            );
    };

    addOrder() {
        const db = getDb();

        return this.getCart()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: new ObjectId(this._id),
                        username: this.username
                    }
                };

                return db.collection("orders").insertOne(order);
            })
            .then(res => {
                this.cart = { items: [] };
                return db
                    .collection("users")
                    .updateOne(
                        { _id: new ObjectId(this._id) },
                        { $set: { cart: { items: [] } } }
                    );
            });
    }

    getOrders() {
        const db = getDb();

        return db
            .collection("orders")
            .find({ "user._id": new ObjectId(this._id) })
            .toArray();
    }

    static findById(userId) {
        const db = getDb();

        return db.collection("users").findOne({ _id: new ObjectId(userId) });
    }
}

module.exports = User;
