const { Product } = require('../models');

const productData = [
  {
    product_name: 'Americano Coffee',
    price: 4.99,
    stock: 2,
    category_id: 1,
  },
  {
    product_name: 'Iced Latte',
    price: 5.99,
    stock: 8,
    category_id: 1,
  },
  {
    product_name: 'Exotic Tea Blend',
    price: 3.99,
    stock: 3,
    category_id: 2,
  },
  {
    product_name: 'Freshly Squeezed Orange Jouice',
    price: 6.99,
    stock: 22,
    category_id: 3,
  },
  {
    product_name: 'Frozen Cappuccino',
    price: 7.99,
    stock: 6,
    category_id: 1,
  },
  {
    product_name: 'chips',
    price: 3.55,
    stock: 33,
    category_id: 4,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;