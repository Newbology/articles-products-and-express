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
  knex('articles');
  res.render('articles/new');
});

router.get('/:url_title', (req, res) => {
  let url_title = req.params.url_title;
  knex('articles')
    .select('title', 'author', 'body')
    .where('url_title', '=', url_title)
    .then(article => {
      articleData.article = article[0];
      res.render('articles/article', articleData);
    });
});

router.get('/:url_title/edit', (req, res) => {
  let url_title = req.params.url_title;
  knex('articles')
    .select('url_title,', 'title', 'author', 'body')
    .where('url_title', '=', url_title)
    .then(article => {
      articleData.article = article[0];
      res.render('articles/edit', articleData);
    });
});

router.post('/', (req, res) => {
  let body = req.body;
  knex('articles')
    .insert({
      url_title: encodeURI(req.body.title),
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
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
  article.url_title = encodeURI(req.body.title);
  knex('articles')
    .where('url_title', '=', url_title)
    .update(article)
    .then(() => {
      res.redirect(`/articles/${article.url_title}`);
    })
    .catch(error => {
      res.redirect(`/articles/${article.url_title}/edit`);
    });
});
module.exports = router;
