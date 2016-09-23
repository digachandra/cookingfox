var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next){
  models.Ingredients.findAll({
    order: 'name ASC'
  }).then (function(resultIngredients){
    models.IngredientTypes.findAll({
      order: 'name ASC'
    }).then(function(resultIngredientTypes){
      models.MealType.findAll({
        order: 'name ASC'
      }).then(function(resultMealTypes){
        models.CuisineTypes.findAll({
          order: 'name ASC'
        }).then(function(resultCuisineTypes){
          //res.render('index', { Ingredients: resultIngredients, IngredientTypes : resultIngredientTypes, MealTypes: resultMealTypes, CuisineTypes: resultCuisineTypes});
          res.render('template-list', {
            title: 'Cooking Fox',
            Ingredients: resultIngredients,
            IngredientTypes: resultIngredientTypes,
            MealTypes: resultMealTypes,
            CuisineTypes: resultCuisineTypes
          });
        })
  	 	})
    })
  })
});

router.get('/:slug', function(req, res, next){
  res.render('cms-list', {
    title: 'Cooking Fox'
  });
});

router.get('/:slug', function(req, res, next){
  models.Recipes.find({
    where: {
      id: req.params.slug
    }
  }).then(function(resultRecipes){
    if(resultRecipes){
      models.RecipeIngredient.findAll({
        where: {
          recipeId: resultRecipes.id
        }
      }).then(function(resultRecipeIngre){
        models.Ingredients.findAll({}).then(function(resultIngredients){
          var hasil = []
          for(var i=0; i<resultRecipeIngre.length; i++){
            for(var j=0; j<resultIngredients.length; j++){
              if(resultRecipeIngre[i].dataValues.ingredientId == resultIngredients[j].dataValues.id){
                hasil[hasil.length] = resultRecipeIngre[i].dataValues.measure + ' ' +resultIngredients[j].dataValues.name
              }
            }
          }
          res.render('template-detail', {
            title: 'Cooking Fox',
            Recipes: resultRecipes.dataValues,
            allIngre: hasil
          });
        })
      })
    }
  })
});

module.exports = router;
