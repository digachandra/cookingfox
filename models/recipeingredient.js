'use strict';
module.exports = function(sequelize, DataTypes) {
  var RecipeIngredient = sequelize.define('RecipeIngredient', {
    measure: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return RecipeIngredient;
};