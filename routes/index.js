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

          models.Recipes.findAll({
          }). then (function(resultRecipes){

            models.RecipeIngredient.findAll({
            }).then (function(resultRecipeIngre){

            //find recipes yang cocok dengan  my ingredient /isSelected
              var availRecipes = [] // utk simpan id recipes yang bisa dimasak
              for (var i=0; i<resultRecipes.length; i++) {


                //buat list ingredient per resep
                var listIngre = []
                for (var j=0; j<resultRecipeIngre.length; j++) {
                  if (resultRecipes[i].dataValues.id == resultRecipeIngre[j].dataValues.recipeId) {
                    listIngre.push(resultRecipeIngre[j].dataValues.ingredientId)
                  }
                }

                //cek apa listIngre ada yang false atau tidak
                var isAvail = true
                var idx = 0;

                while (idx < listIngre.length && isAvail){
                  var jdx = 0
                  while (jdx < resultIngredients.length && isAvail) {
                    if (listIngre[idx] == resultIngredients[jdx].dataValues.id && !resultIngredients[jdx].dataValues.isSelected) {
                      isAvail = false
                    } else {
                      jdx++
                    }
                  }
                  idx++
                }
                if (isAvail) {
                  availRecipes.push(resultRecipes[i].dataValues.id)
                }
               }

              console.log('Resep yang tersedia:', availRecipes)
              res.render('index', { Recipes: resultRecipes, availRecipes: availRecipes, Ingredients: resultIngredients, IngredientTypes : resultIngredientTypes, MealTypes: resultMealTypes, CuisineTypes: resultCuisineTypes});

            })
          })
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
