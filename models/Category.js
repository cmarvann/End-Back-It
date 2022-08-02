const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Create Category model
class Category extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    categoryname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
        
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    }
  },
  {
   hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newCategoryData) {
        newCategoryData.password = await bcrypt.hash(newCategoryData.password, 10);
        return newCategoryData;
      },

      async beforeUpdate(updatedCategoryData) {
        updatedCategoryData.password = await bcrypt.hash(updatedCategoryData.password, 10);
        return updatedCategoryData;
      } 
  },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;