const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { adminRoutes } = require("./routes/admin");
const { shopRoutes } = require("./routes/shop");
const { pageNotFound } = require("./controllers/error");

const server = express();

server.set("view engine", "ejs");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public"))); // For CSS

server.use("/admin", adminRoutes);
server.use(shopRoutes);
server.use(pageNotFound);

server.listen(3000);
