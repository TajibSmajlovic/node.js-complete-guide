const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { adminRoutes } = require("./routes/admin");
const { shopRoutes } = require("./routes/shop");
const { pageNotFound } = require("./controllers/error");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const Order = require("./models/order");
const CartItem = require("./models/cart-item");
const OrderItem = require("./models/order-items");

const server = express();

server.set("view engine", "ejs");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public"))); // For CSS
server.use((req, res, next) => {
    User.findAll({
        where: {
            id: 1
        }
    })
        .then(user => {
            console.log(user);
            req.user = user[0];
            next();
        })
        .catch(err => console.log(err));
});

server.use("/admin", adminRoutes);
server.use(shopRoutes);
server.use(pageNotFound);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    //.sync({ force: true })
    .sync()
    .then(res => {
        const test = User.findAll();
        return User.findAll();
    })
    .then(user => {
        if (!user) {
            return User.create({ name: "Tajib", email: "mail@mail.com" });
        }
        return user;
    })
    .then(user => {
        // console.log(user[0]);
        return user[0].createCart();
    })
    .then(cart => server.listen(3000))

    .catch(err => console.log(err));
