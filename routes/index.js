const express=require('express');
const asyncMiddleware=require('../middleware/async');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const authController=require('../controllers/auth-controller');
const chefController=require('../controllers/chef-controller');
const dietController=require('../controllers/diet-controller');
const dietPlanController=require('../controllers/diet-plan-conroller');
// const genDietPlanController=require('../controllers/gen-diet-plan-controller');
const ingCatController=require('../controllers/ing-cat-controller');
const ingController=require('../controllers/ingredient-controller');
const occasionController=require('../controllers/occasion-controller');
const recipeCatController=require('../controllers/recipe-cat-controller');
const recipeController=require('../controllers/recipe-controller');
const recipeCousineController=require('../controllers/recipe-cousine-controller');
const recipeStepController=require('../controllers/recipe-step-controller');
const searchController=require('../controllers/search-controller');
const shoppingListController=require('../controllers/shopping-list-controller');
const unitController=require('../controllers/unit-controller');
const userController=require('../controllers/user-controller');
const userDietController=require('../controllers/user-diet-contoller');
const userProfileController=require('../controllers/user-profile-controller');
const error=require('../middleware/error');
const multer=require('multer');
const path = require('path');
var bodyParser = require('body-parser');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
});

var upload = multer({storage: storage});


module.exports=function(app){
app.use(express.json());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
app.use('/api', router.post('/auth', asyncMiddleware(authController.auth)));

app.use('/api',router.get('/chefs',asyncMiddleware(chefController.getChefs)));
app.use('/api',router.post('/chef',asyncMiddleware(chefController.createChef)));
app.use('/api',router.put('/chef/:id',asyncMiddleware(chefController.updateChef)));
app.use('/api',router.delete('/chef/:id',asyncMiddleware(chefController.deleteChef)));
app.use('/api',router.get('/chef/:id',asyncMiddleware(chefController.getChef)));

app.use('/api',router.get('/dietplans',asyncMiddleware(dietPlanController.getDietPlans) ));

app.use('/api',router.post('/dietplan', auth, asyncMiddleware(dietPlanController.createDietPlan)));

app.use('/api',router.put('/dietplan/:id', asyncMiddleware(dietPlanController.updateDietPlan)));

app.use('/api',router.delete('/dietplan/:id', [auth, admin], asyncMiddleware(dietPlanController.deleteDietPlan)));

app.use('/api',router.get('/dietplan/:id', asyncMiddleware(dietPlanController.getDietPlan )));



app.use('/api',router.get('/userprofile',auth,asyncMiddleware(userProfileController.getUserProfile) ));

app.use('/api',router.post('/userprofile', auth, asyncMiddleware(userProfileController.createUserProfile)));

app.use('/api',router.delete('/userprofile/:id', [auth, admin], asyncMiddleware(userProfileController.deleteUserProfile)));

app.use('/api',router.put('/userprofile/:id', asyncMiddleware(userProfileController.updateUserProfile)));
app.use('/api',router.put('/userprofile/likerecipe/:id', asyncMiddleware(userProfileController.updateLikedRecipes)));
app.use('/api',router.put('/userprofile/cookrecipe/:id', asyncMiddleware(userProfileController.updateCookedRecipes)));
app.use('/api',router.put('/userprofile/saverecipe/:id', asyncMiddleware(userProfileController.updateSavedRecipes)));



app.use('/api',router.get('/diets',asyncMiddleware(dietController.getDiets) ));

app.use('/api',router.post('/diet', auth, asyncMiddleware(dietController.createDiet)));

app.use('/api',router.put('/diet/:id', asyncMiddleware(dietController.updateDiet)));

app.use('/api',router.delete('/diet/:id', [auth, admin], asyncMiddleware(dietController.deleteDiet)));

app.use('/api',router.get('/diet/:id', asyncMiddleware(dietController.getDiet )));


app.use('/api',router.post('/upload',upload.single('image'),asyncMiddleware(async (req, res) => {
 
  if(!req.file) {
    res.status(500);
  }
  res.json({ fileUrl: 'http:localhost:3000/' + req.file.filename });
})));

app.use('/api',router.get('/ingredients', asyncMiddleware(ingController.getIngredients)));


app.use('/api',router.post('/ingredient',upload.single('image'),asyncMiddleware(ingController.createIngredient)));

app.use('/api',router.put('/ingredient/:id', asyncMiddleware(ingController.updateIngredient)));

app.use('/api',router.delete('/ingredient/:id', [auth, admin], asyncMiddleware(ingController.deleteIngredient)));

app.use('/api',router.get('/ingredient/:id',asyncMiddleware(ingController.getIngredient)));



app.use('/api',router.get('/ingcats', asyncMiddleware(ingCatController.getIngredientCats)));

app.use('/api',router.post('/ingcat', auth, asyncMiddleware(ingCatController.createIngredientCat)));

app.use('/api',router.put('/ingcat/:id', asyncMiddleware(ingCatController.updateIngredientCat)));

app.use('/api',router.delete('/ingcat/:id', [auth, admin], asyncMiddleware(ingCatController.deleteIngredientCat)));

app.use('/api',router.get('/ingcat/:id',asyncMiddleware(ingCatController.getIngredientCat)));


app.use('/api',router.get('/units', asyncMiddleware(unitController.getIngredientUnits)));

app.use('/api',router.post('/unit', asyncMiddleware(unitController.createIngredientUnit)));

app.use('/api',router.put('/unit/:id', asyncMiddleware(unitController.updateIngredientUnit)));

app.use('/api',router.delete('/unit/:id', [auth, admin], asyncMiddleware(unitController.deleteIngredientUnit)));

app.use('/api',router.get('/unit/:id',asyncMiddleware(unitController.getIngredientUnit)));


app.use('/api',router.get('/occasions', asyncMiddleware(occasionController.getOccasions)));

app.use('/api',router.post('/occasion', auth,asyncMiddleware(occasionController.createOccasion)));

app.use('/api',router.put('/occasion/:id', asyncMiddleware(occasionController.updateOccasion)));

app.use('/api',router.delete('/occasion/:id', [auth, admin], asyncMiddleware(occasionController.deleteOccasion)));

app.use('/api',router.get('/occasion/:id',asyncMiddleware(occasionController.getOccasion)));




app.use('/api',router.get('/recipes', asyncMiddleware(recipeController.getRecipes))) ;

app.use('/api',router.post('/recipe',upload.single('image'), asyncMiddleware(recipeController.createRecipe)));

app.use('/api',router.put('/recipe/:id', asyncMiddleware(recipeController.updateRecipe)));

app.use('/api',router.delete('/recipe/:id', [auth, admin], asyncMiddleware(recipeController.deleteRecipe)));

app.use('/api',router.get('/recipe/:id', asyncMiddleware(recipeController.getRecipe)));





app.use('/api',router.get('/recipecats', asyncMiddleware(recipeCatController.getRecipeCats)));

app.use('/api',router.post('/recipecat', auth, asyncMiddleware(recipeCatController.createRecipeCat)));

app.use('/api',router.put('/recipecat/:id', asyncMiddleware(recipeCatController.updateRecipeCat)));

app.use('/api',router.delete('/recipecat/:id', [auth, admin], asyncMiddleware(recipeCatController.deleteRecipeCat)));

app.use('/api',router.get('/recipecat/:id', asyncMiddleware(recipeCatController.getRecipeCat)));


app.use('/api',router.get('/recipecousines', asyncMiddleware(recipeCousineController.getRecipeCousines)) );

app.use('/api',router.post('/recipecousine',upload.single('image'), asyncMiddleware(recipeCousineController.createRecipeCousine)));

app.use('/api',router.put('/recipecousine/:id', asyncMiddleware(recipeCousineController.updateRecipeCousine)));

app.use('/api',router.delete('/recipecousine/:id', [auth, admin], asyncMiddleware(recipeCousineController.deleteRecipeCousine)));

app.use('/api',router.get('/recipecousine/:id', asyncMiddleware(recipeCousineController.getRecipeCousine)));



app.use('/api',router.get('/recipesteps/:id', asyncMiddleware(recipeStepController.getRecipeSteps)) );

app.use('/api',router.post('/recipestep',upload.single('image'), asyncMiddleware(recipeStepController.createRecipeStep)));

app.use('/api',router.put('/recipestep/:id', asyncMiddleware(recipeStepController.updateRecipeStep)));

app.use('/api',router.delete('/recipestep/:id', [auth, admin], asyncMiddleware(recipeStepController.deleteRecipeStep)));

app.use('/api',router.get('/recipestep/:id', asyncMiddleware(recipeStepController.getRecipeStep)));


app.use('/api',router.get('/search', searchController.search));

app.use('/api',router.get('/me', auth,asyncMiddleware(userController.getUser)));

app.use('/api',router.post('/user', asyncMiddleware(userController.createUser)));

app.use(error);
}



