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
  let temp = [];

  temp.push(dataBase.getProductId(id, product));
  console.log('temp', temp);
  res.render('products/new', { temp });
});

// router.get('/:id/edit', (req, res) => {
//   let id = Number(req.params.id);

//   res.render('templates/products/product', { products });
// });
// router.get('/new', (req, res) => {});

router.post('/', (req, res) => {
  let product = req.body;
  if (dataBase.addProduct(product) == true) {
    res.redirect('/products/new');
  } else {
    res.redirect('/products/');
  }
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
