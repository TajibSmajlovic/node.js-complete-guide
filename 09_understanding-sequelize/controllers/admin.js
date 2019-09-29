const Product = require("../models/product");

const getAddProductPage = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false
    });
};

const addProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    req.user
        .createProduct({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        })
        .then(() => {
            console.log("Successful!");
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err));
};

const editProduct = (req, res, next) => {
    const productId = req.params.productId;
    const editMode = req.query.edit;

    if (!editMode) res.redirect("/");

    req.user
        .getProducts({
            where: {
                id: productId
            }
        })
        .then(product => {
            if (!product[0]) res.redirect("/");
            res.render("admin/edit-product", {
                pageTitle: "Add Product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product[0]
            });
        })
        .catch(err => console.log(err));
};

const postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    Product.findAll({
        where: {
            id: productId
        }
    })
        .then(product => {
            product[0].title = updatedTitle;
            product[0].price = updatedPrice;
            product[0].description = updatedDescription;
            product[0].imageUrl = updatedImageUrl;
            return product[0].save();
        })
        .then(() => {
            console.log("Updated!");
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err));
};

const getProducts = (req, res, next) => {
    req.user
        .getProducts()
        .then(products => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "/admin/products",
                hasProducts: products.length > 0
            });
        })
        .catch(err => console.log(err));
};

const deleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.destroy({
        where: {
            id: productId
        }
    })
        .then(() => {
            console.log("Deleted!");
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err));
};

module.exports = {
    addProduct,
    getAddProductPage,
    getProducts,
    editProduct,
    postEditProduct,
    deleteProduct
};
