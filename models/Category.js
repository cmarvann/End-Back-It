const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class Category extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields/columns for User model
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    modelName: 'category'
  }
);

module.exports = Category;