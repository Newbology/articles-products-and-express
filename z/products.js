let productsData = [];

let productId = 1;

function getAllproducts() {
  return productsData;
}

function getProductId(id) {
  let productById = productsData.find(product => {
    return product.id === id;
  });

  return productById;
}

function addProduct(product) {
  product.id = productId++;
  productsData.push(product);
}

function deleteProduct(id) {
  let newArr = productsData.filter(productsData => {
    return productsData.id !== id;
  });
  productsData = newArr;
  return true;
}

function updateProduct(id, newProduct) {
  let oldProduct = productsData.find(product => {
    return product.id === id;
  });
  oldProduct.name = newProduct.name;
  oldProduct.price = newProduct.price;
  oldProduct.inventory = newProduct.inventory;

  return oldProduct;
}

module.exports = {
  addProduct,
  getProductId,
  getAllproducts,
  updateProduct,
  deleteProduct
};
