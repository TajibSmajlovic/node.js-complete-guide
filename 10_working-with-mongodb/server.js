const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { mongoConnect, getDb } = require("./utils/database");
const { adminRoutes } = require("./routes/admin");
const { shopRoutes } = require("./routes/shop");
const { pageNotFound } = require("./controllers/error");

const server = express();

server.set("view engine", "ejs");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public"))); // For CSS
server.use((req, res, next) => {
    next();
});

server.use("/admin", adminRoutes);
server.use(shopRoutes);
server.use(pageNotFound);

mongoConnect(() => server.listen(3000));
