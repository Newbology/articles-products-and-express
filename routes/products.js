const express = require('express');
const router = express.Router();
const dataBase = require('../db/products');

router.get('/', (req, res) => {
  let products = dataBase.getAllproducts();
  res.render('products/index', { products });
});

router.get('/:id', (req, res) => {
  let id = Number(req.params.id);
  let product = req.body;
  dataBase.getProductId(id, product);
  res.render('products/:id', { id, product });
});

// router.get('/:id/edit', (req, res) => {});
// router.get('/new', (req, res) => {});

router.post('/', (req, res) => {
  let product = req.body;
  dataBase.addProduct(product);
  res.send('information was sent');
  res.end();
});

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
