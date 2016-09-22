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

router.get('/:slug', function(req, res, next) {
  res.render('template-detail', { title: 'Cooking Fox' });
});

module.exports = router;
