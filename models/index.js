// import models
const Category = require('./Category');

const Product = require('./Product');

// const ProductTag = require('./ProductTag');

// const Tag = require('./Tag');

// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)



// // create associations
// Category.hasMany(Product, {
//     foreignKey: 'category_id',
//     onUpdate: 'cascade'
//   });
  
//   Product.belongsTo(Category, {
//     foreignKey: 'category_id'
//   });
  
//   Product.belongsToMany(Tag, {
//     through: ProductTag,
//     as: 'producttag',
//     foreignKey: 'category_id'
//   });
  
//   Tag.belongsToMany(Product, {
//     through: ProductTag,
//     as: 'producttag',
//     foreignKey: 'tag_id'
//   });
  

module.exports = { Category };
// module.exports = { Category, Product, ProductTag, Tag };

