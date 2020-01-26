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
    const userId = req.user._id;
    const product = new Product({
        title,
        price,
        description,
        imageUrl,
        userId
    });

    product
        .save()
        .then(() => res.redirect("/admin/products"))
        .catch(err => console.error("addProduct():", err));
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
        .catch(err => console.error("editProduct():", err));
};
//
const postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    Product.findById(productId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl;

            return product.save();
        })
        .then(() => res.redirect("/admin/products"))
        .catch(err => console.error("postEditProduct():", err));
};
//
const getProducts = (req, res, next) => {
    // Product.find().populate("userID", "name") -- gets user object with only name
    // Product.find().select("title price -_id") -- gets object with title, description (_id is not retrieved)
    Product.find()
        .then(products =>
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "/admin/products",
                hasProducts: products.length > 0
            })
        )
        .catch(err => console.error("getProducts():", err));
};
//
const deleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.findByIdAndRemove(productId)
        .then(() => res.redirect("/admin/products"))
        .catch(err => console.error("deleteProduct():", err));
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
