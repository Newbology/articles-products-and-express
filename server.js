const express = require('express');
const exphbs = require('express-handlebars');
const articles = require('./routes/articles');
const products = require('./routes/products');
var bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/articles', articles);
app.use('/products', products);

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
