const Product = require("../models/product");

const getAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

const addProduct = (req, res, next) => {
  const product = new Product(
    null,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );
  product.save();
  res.redirect("/");
};

const editProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editMode = req.query.edit;

  if (!editMode) res.redirect("/");

  Product.findById(productId, product => {
    if (!product) res.redirect("/");
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/edit-product",
      editing: editMode,
      product
    });
  });
};

const postEditProduct = (req, res, next) => {
  const product = new Product(
    req.body.productId,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );
  product.save();
  res.redirect("/admin/products");
};

const getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

const deleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.deleteProduct(productId);

  res.redirect("/admin/products");
};

module.exports = {
  addProduct,
  getAddProductPage,
  getProducts,
  editProduct,
  postEditProduct,
  deleteProduct
};
