var express = require('express');
var router = express.Router();
let models = require('../models')


/* GET home page. */
router.get('/', function(req, res, next) {
  
  models.Ingredients.findAll({
  	order : 'name ASC'
  }).then (function(resultIngredients) {

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






























router.get('/recipes', function(req, res, next){
  models.Recipes.find({
    where : {
      id : req.query.id
    }
  }).then (function(resultRecipes){
    console.log('hasil cari : ', resultRecipes.dataValues)
    if (resultRecipes) {
      models.RecipeIngredient.findAll({
        where : {
          recipeId : resultRecipes.id
        }
      }).then (function(resultRecipeIngre){
        models.Ingredients.findAll({}).then(function(resultIngredients){
          var hasil = []
          for (var i=0; i<resultRecipeIngre.length; i++) {
            for (var j=0; j<resultIngredients.length; j++){
              console.log('apa benar?', resultRecipeIngre[i].dataValues.ingredientId, resultIngredients[j].dataValues.id)
              if (resultRecipeIngre[i].dataValues.ingredientId == resultIngredients[j].dataValues.id) {
                hasil[hasil.length] =  resultRecipeIngre[i].dataValues.measure + ' ' +resultIngredients[j].dataValues.name
              }
            }
          }
          res.render('recipes', {Recipes : resultRecipes.dataValues, allIngre: hasil})

          })

      })   
    }
  })
})



module.exports = router;
