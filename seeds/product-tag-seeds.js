const { ProductTag } = require('../models');

const productTagData = [
  {
    product_id: 1,
    tag_id: 2,
  },
  {
    product_id: 1,
    tag_id: 4,
  },
  {
    product_id: 1,
    tag_id: 6,
  },
  {
    product_id: 1,
    tag_id: 8,
  },
  {
    product_id: 1,
    tag_id: 10,
  },
  {
    product_id: 2,
    tag_id: 3,
  },
  {
    product_id: 2,
    tag_id: 6,
  },
  {
    product_id: 2,
    tag_id: 9,
  },
  {
    product_id: 2,
    tag_id: 12,
  },
  {
    product_id: 2,
    tag_id: 15,
  },
  {
    product_id: 3,
    tag_id: 22,
  },
  {
    product_id: 4,
    tag_id: 33,
  },
  
];

const seedProductTags = () => ProductTag.bulkCreate(productTagData);

module.exports = seedProductTags;