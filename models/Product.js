// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt');

// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//   }
}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    productname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: { isDecimal: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultvalue: "10",
      validate: {isNumeric: true
      }
    
    // category_id: {
    //   type: DataTypes.INTEGER,
    //   references: id
    }
  },
  {
    hooks: {
       // set up beforeCreate lifecycle "hook" functionality
       async beforeCreate(newProductData) {
         newProductData.password = await bcrypt.hash(newProductData.password, 10);
         return newCategoryData;
       },
 
       async beforeUpdate(updatedProductData) {
         updatedProductData.password = await bcrypt.hash(updatedProductData.password, 10);
         return updatedProductData;
       } 
    
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;