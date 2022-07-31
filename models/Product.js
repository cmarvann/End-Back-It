// // import important parts of sequelize library
// const { Model, DataTypes } = require('sequelize');

// // const bcrypt = require('bcrypt');

// // import our database connection from config.js
// const sequelize = require('../config/connection');

// // Initialize Product model (table) by extending off Sequelize's Model class
// class Product extends Model {
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//   }
// }

// // set up fields and rules for Product model
// Product.init(
//   {
//     // define columns
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     productname: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     price: {
//       type: DataTypes.DECIMAL,
//       allowNull: false,
//       validate: {
//         len: [2]
//       }
//     },
//     stock: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultvalue: "10",
//       validate: {
//         len: [2]
//       }
//     },
//     category_id: {
//       type: DataTypes.INTEGER,
//       references: category_id,
//       key: id
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'product',
//   }
// );

// module.exports = Product;