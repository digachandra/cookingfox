var express = require('express');
var router = express.Router();
let models = require('../models')


/* GET home page. */
router.get('/', function(req, res, next) {
  
  models.Ingredients.findAll({
  	order : 'name ASC'
  }).then (function(resultIngredients){

  	 models.IngredientTypes.findAll({
  	 	order : 'name ASC'
  	 }). then (function(resultIngredientTypes) {

  	 	models.MealType.findAll({
  	 	  order : 'name ASC'
  	 	}). then (function(resultMealTypes) {

  	 		models.CuisineTypes.findAll({
  	 		  order : 'name ASC' 
  	 		}). then (function(resultCuisineTypes){
		  	 	res.render('index', { Ingredients: resultIngredients, IngredientTypes : resultIngredientTypes, MealTypes: resultMealTypes, CuisineTypes: resultCuisineTypes});
  	 		})
  	 	})
  	 })
  })
});

module.exports = router;
