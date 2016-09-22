'use strict';
module.exports = function(sequelize, DataTypes) {
  var Recipes = sequelize.define('Recipes', {
    judul: DataTypes.STRING,
    tgl: DataTypes.DATE,
    direction: DataTypes.TEXT,
    level: DataTypes.STRING,
    cuisineTypeId: DataTypes.INTEGER,
    mealTypeId: DataTypes.INTEGER,
    timeprep: DataTypes.INTEGER,
    timecook: DataTypes.INTEGER,
    serving: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Recipes;
};