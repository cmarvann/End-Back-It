const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class Product extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields/columns for User model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 30]
      }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        ref:  {model: 'category',
                key: 'id'
       }
      },
  
      price: {
        type: DataTypes.DECIMAL (10, 2),
        allowNull: false,
        validate: { isDecimal: true
        }
      }, 
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultvalue: "10",
      validate: {isNumeric: true

      }
      },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
  hooks: {
    // set up beforeCreate lifecycle "hook" functionality
    async beforeCreate(newProductData) {
      newProductData.password = await bcrypt.hash(newProductData.password, 10);
      return newProductData;
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
    modelName: 'product'
  }
);

module.exports = Product;
