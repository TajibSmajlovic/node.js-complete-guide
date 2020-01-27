const getLogin = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "Login",
        path: "/login",
        isLoggedIn: req.isLoggedIn
    });
};

const postLogin = (req, res, next) => {
    req.isLoggedIn = true;
    res.redirect("/");
};

module.exports = { getLogin, postLogin };
