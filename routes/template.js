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
              res.render('template-list', {
                "title": "Cooking Fox",
                Recipes: resultRecipes,
                availRecipes: availRecipes,
                Ingredients: resultIngredients,
                IngredientTypes : resultIngredientTypes,
                MealTypes: resultMealTypes,
                CuisineTypes: resultCuisineTypes
              });
            })
          })
  	 		})
  	 	})
  	 })
  })
});

router.get('/cms', function(req, res, next){
  res.render('cms-list', {
    title: 'Cooking Fox :: CMS'
  });
});

router.get('/cms/:slug', function(req, res, next){
  // res.render('cms-list', {
  //   title: 'Cooking Fox'
  // });
  res.send("Asd")
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

router.get('/test', function(req, res, next){
  // res.render('cms-list', {
  //   title: 'Cooking Fox'
  // });
  res.send("Asd")

  /*
  3. Buat sebuah function bernama separateNumber.
  Function tsb akan menerima sebuah parameter string,
  isinya nomor dengan dengan jumlah digit 10-16,
  kemudian menghasilkan string kembali dengan ketentuan : setiap angka ganjil berdampingan, maka dipisahkan oleh "-",
  dan angka 0 tidak dianggap sebagai angka ganjil.
  */
  function separateNumber(n){
    var odd_number = ["0", "1", "3", "5", "7", "9"]

    var temp_number_array = n.toString().split("")
    var temp_number_string = ""

    for(var idx = 0; idx < temp_number_array.length; idx++){
      temp_number_string += temp_number_array[idx]

      var odd_number_flag = 0
      for(var idy = 0; idy < odd_number.length; idy++){
        if(temp_number_string[idx] == odd_number[idy]){
          odd_number_flag += 1
        }
        if(idx != 0){
          if(temp_number_string[idx-1] == odd_number[idy])
            odd_number_flag += 1
        }
      }

      if(odd_number_flag == 2) temp_number_string += "-"
    }
    console.log(temp_number_string)
  }
  separateNumber(9113020675971081); //result: 9-1-1-302067-5-9-7-1081

  /*
   2. Buat sebuah function bernama indexPrima.
  Function tsb akan menerima sebuah parameter number, kemudian menghasilkan angka prima dengan urutan ke -x (sesuai yang diinput).
  */
  function indexPrima(n){
    //write your code here
    let prime_string = "2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997";
    let prime_array = prime_string.split(", ")

    console.log(prime_array[n])


    for(var idx = 0; idx < n; idx++){

    }
  }
  indexPrima(4); //result: 7
  indexPrima(50); //result: 229

});

module.exports = router;
