const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        "mongodb+srv://tajib:TDBrc2lpmDKpQt0J@nodejs-complete-guide-stjck.mongodb.net/shop?retryWrites=true&w=majority",
        { useUnifiedTopology: true }
    )
        .then(client => {
            _db = client.db();
            callback();
        })
        .catch(err => console.log(err));
};

const getDb = () => {
    if (_db) return _db;

    throw "No database found!";
};

module.exports = { mongoConnect, getDb };
