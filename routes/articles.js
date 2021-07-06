const express = require('express');
const router = express.Router();
const knex = require('../database');

const articleData = {
  articleList: null,
  article: null,
  error: null
};

router.get('/', (req, res) => {
  knex('articles')
    .select('title', 'author', 'body')
    .then(articleList => {
      articleData.articleList = articleList;
      res.render('articles/index', articleData);
    });
});

router.get('/new', (req, res) => {
  res.render('articles/new');
});

router.get('/:url_title', (req, res) => {
  let url_title = req.params.url_title;
  knex('articles')
    .select('title', 'author', 'body')
    .where('url_title', '=', url_title)
    .then(article => {
      res.render('articles/article', article[0]);
    });
});

router.get('/:url_title/edit', (req, res) => {
  let url_title = req.params.url_title;
  console.log('url_title', url_title);
  knex('articles')
    .select('url_title', 'title', 'author', 'body')
    .where('url_title', '=', url_title)
    .then(article => {
      res.render('articles/edit', article[0]);
    });
});

router.post('/', (req, res) => {
  let body = req.body;
  knex('articles')
    .insert({
      url_title: encodeURI(body.title),
      title: body.title,
      author: body.author,
      body: body.body
    })
    .then(() => {
      res.redirect('articles/');
    })
    .catch(error => {
      res.redirect('articles/new');
    });
});

router.delete('/:url_title', (req, res) => {
  let url_title = req.params.url_title;

  knex('articles')
    .where('url_title', '=', url_title)
    .delete()
    .then(() => {
      res.redirect('articles/');
    })
    .catch(error => {
      res.redirect(`/article/${url_title}`);
    });
});

router.put('/:url_title', (req, res) => {
  let url_title = req.params.url_title;
  let article = req.body;
  article.url_title = encodeURI(article.title);
  console.log('article.url_title', article.url_title);
  knex('articles')
    .where('url_title', '=', url_title)
    .update(article)
    .then(() => {
      res.redirect(`/articles/${article.url_title}`);
    });
});
module.exports = router;
