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
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const product = new Product(title, price, description, imageUrl);
    product
        .save()
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

    Product.findById(productId)
        .then(product => {
            if (!product) res.redirect("/");
            res.render("admin/edit-product", {
                pageTitle: "Add Product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err));
};
//
const postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    const product = new Product(
        updatedTitle,
        updatedPrice,
        updatedDescription,
        updatedImageUrl,
        productId
    );

    product
        .save()
        .then(() => {
            // console.log("Updated!");
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err));
};
//
const getProducts = (req, res, next) => {
    Product.fetchAll()
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
//
const deleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.delete(productId)
        .then(() => {
            // console.log("Deleted!");
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err));
};
//
module.exports = {
    addProduct,
    getAddProductPage,
    getProducts,
    editProduct,
    postEditProduct,
    deleteProduct
};
