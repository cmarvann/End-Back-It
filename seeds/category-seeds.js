const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Coffee',
  },
  {
    category_name: 'Tea',
  },
  {
    category_name: 'Juice',
  },
  {
    category_name: 'Snacks',
  },
  
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;