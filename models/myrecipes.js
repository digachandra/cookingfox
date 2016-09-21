'use strict';
module.exports = function(sequelize, DataTypes) {
  var myrecipes = sequelize.define('myrecipes', {
    judul: DataTypes.STRING,
    tgl: DataTypes.DATE,
    direction: DataTypes.TEXT,
    level: DataTypes.STRING,
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
  return myrecipes;
};