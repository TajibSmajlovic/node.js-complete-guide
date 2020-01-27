const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
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

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
    .connect(
        "mongodb+srv://tajib:TDBrc2lpmDKpQt0J@nodejs-complete-guide-stjck.mongodb.net/shop?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => app.listen(3000))
    .catch(err => console.error("connect():", err));
