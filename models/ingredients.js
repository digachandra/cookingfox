'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ingredients = sequelize.define('Ingredients', {
    name: DataTypes.STRING,
    isSelected: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ingredients;
};