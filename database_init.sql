\c newbology;
DROP DATABASE IF EXISTS articles_and_products;
CREATE DATABASE articles_and_products OWNER newbology;
 
 \c articles_and_products;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) CHECK (length(name) > 0),
  price INT CHECK (price > 0),
  inventory INT CHECK (inventory > 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS articles;
CREATE TABLE articles(
  id SERIAL PRIMARY KEY,
  url_title VARCHAR(255) CHECK (length(url_title) > 0),
  title VARCHAR(255) CHECK (length(title) > 0),
  author VARCHAR(255)  CHECK (length(author) > 0),
  body text CHECK (length(url_title) > 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
