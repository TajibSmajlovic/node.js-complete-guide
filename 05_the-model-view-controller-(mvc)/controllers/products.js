const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formCSS: true,
    productCSS: true,
    ActiveAddProduct: true
  })
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title)
  product.save()
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop', {
       prods: products,
       pageTitle: 'Shop',
       path: '/',
       hasProducts: products.length > 0,
       activeShop: true,
       productCSS: true
     })
  })
}

exports.pageNotFound = (req, res, next) => {
    res.status(404).render('404', {pageTitle: 404, pageContent: 'Page Not Found!!!'})
}
