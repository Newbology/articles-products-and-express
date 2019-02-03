const express = require('express');
const router = express.Router();
const dataBase = require('../db/products');

router.get('/', (req, res) => {
  let products = dataBase.getAllproducts();
  res.render('products/index', { products });
}).post('/', (req, res) => {
  let product = req.body;
  dataBase.addProduct(product);
  res.send('information was sent');
  res.end();
});

router.get('/:id', (req, res) => {
  let id = Number(req.params.id);
  let product = dataBase.getProductId(id);
  res.render('products/product', { product });
});

router.get('/:id/edit', (req, res) => {
  let id = Number(req.paramds.id);
  let product = dataBase.getProductId(id);
  res.render('products/edit', { product });
});
// router.get('/new', (req, res) => {});



router.delete('/:id', (req, res) => {
  let id = Number(req.params.id);
  dataBase.deleteProduct(id);
  res.redirect('/products');
});

router.put('/:id', (req, res) => {
  let id = Number(req.params.id);
  let newProduct = req.body;
  dataBase.updateProduct(id, newProduct);
  res.redirect('/products');
});

module.exports = router;
