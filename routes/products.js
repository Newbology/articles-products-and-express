const express = require('express');
const router = express.Router();
const knex = require('../database');

let dataObject = {
  products: null
};

router.get('/', (req, res) => {
  knex('products')
    .select('name', 'price', 'inventory')
    .then(products => {
      dataObject.products = products;
      res.render('products/index', dataObject);
    });
});

router.get('/new', (req, res) => {
  res.render('products/new');
});

router.get('/:id', (req, res) => {
  let id = Number(req.params.id);
  knex('products')
    .select('name', 'price', 'inventory')
    .where('id', id)
    .then(product => {
      res.render('products/product', product[0]);
    });
});

router.get('/:id/edit', (req, res) => {
  let id = Number(req.params.id);
  knex('products')
    .select('id', 'name', 'price', 'inventory')
    .where('id', id)
    .then(product => {
      res.render('products/edit', product[0]);
    });
});

router.post('/', (req, res) => {
  let body = req.body;
  knex('products')
    .insert({
      name: body.name,
      price: parseInt(body.price),
      inventory: parseInt(body.inventory)
    })
    .then(() => {
      res.redirect('/products/');
    });
});

router.delete('/:id', (req, res) => {
  let id = Number(req.params.id);
  knex('products')
    .where('id', '=', id)
    .del()
    .then(() => {
      res.redirect('/products');
    });
});

router.put('/:id', (req, res) => {
  let id = Number(req.params.id);
  let body = req.body;
  body.price = parseInt(body.price);
  body.inventory = parseInt(body.inventory);
  delete body._method;
  knex('products')
    .where('id', id)
    .update(body)
    .then(() => {
      console.log('id', id);
      res.redirect(`/products/${id}`);
    });
});

module.exports = router;
