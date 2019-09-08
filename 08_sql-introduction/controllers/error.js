exports.pageNotFound = (req, res, next) => {
    res.status(404).render("404", {
        pageTitle: 404,
        pageContent: "Page Not Found!!!",
        path: "/404"
    });
};
