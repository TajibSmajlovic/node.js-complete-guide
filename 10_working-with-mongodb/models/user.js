const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;
const { getDb } = require("../utils/database");

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    save() {
        const db = getDb();

        return db.collection("users").insertOne(this);
    }

    static findById(userId) {
        const db = getDb();

        return db.collection("users").findOne({ _id: new ObjectId(userId) });
    }
}

module.exports = User;
