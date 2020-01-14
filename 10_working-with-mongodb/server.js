const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const User = require("./models/user");
const { mongoConnect, getDb } = require("./utils/database");
const { adminRoutes } = require("./routes/admin");
const { shopRoutes } = require("./routes/shop");
const { pageNotFound } = require("./controllers/error");

const server = express();

server.set("view engine", "ejs");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public"))); // For CSS
server.use((req, res, next) => {
    User.findById("5e1dfd718d8d332884db869c").then(user => {
        if (user) {
            // console.log("User found!");
            req.user = user;
            next();
        } else {
            const user = new User("tajib", 1234);
            user.save()
                .then(() => {
                    // console.log("User added!");
                    next();
                })

                .catch(err => console.log(err));
        }
    });
});

server.use("/admin", adminRoutes);
server.use(shopRoutes);
server.use(pageNotFound);

mongoConnect(() => server.listen(3000));
