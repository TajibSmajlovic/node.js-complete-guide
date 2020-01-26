const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./models/user");
const { adminRoutes } = require("./routes/admin");
const { shopRoutes } = require("./routes/shop");
const { pageNotFound } = require("./controllers/error");

const server = express();

server.set("view engine", "ejs");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public"))); // For CSS
server.use((req, res, next) => {
    User.findById("5e206f816e9c7d2f08e10400").then(user => {
        if (user) {
            req.user = user;
            next();
        } else {
            const user = new User({ username: "tajib", password: 12345 });

            user.save()
                .then(() => next())
                .catch(err => console.error("User handler:", err));
        }
    });
});

server.use("/admin", adminRoutes);
server.use(shopRoutes);
server.use(pageNotFound);

mongoose
    .connect(
        "mongodb+srv://tajib:TDBrc2lpmDKpQt0J@nodejs-complete-guide-stjck.mongodb.net/shop?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => server.listen(3000))
    .catch(err => console.error("connect():", err));
