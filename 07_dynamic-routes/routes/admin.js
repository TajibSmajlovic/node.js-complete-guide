const express = require("express");

const router = express.Router();

const {
  getAddProductPage,
  addProduct,
  getProducts,
  editProduct,
  postEditProduct,
  deleteProduct
} = require("../controllers/admin");

router.get("/add-product", getAddProductPage);
router.get("/products", getProducts);
router.get("/edit-product/:productId", editProduct);

router.post("/add-product", addProduct);
router.post("/edit-product", postEditProduct);
router.post("/delete-product", deleteProduct);

module.exports = {
  adminRoutes: router
};
