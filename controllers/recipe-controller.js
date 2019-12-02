const {Recipe, validateRecipe} = require('../models/recipe');
const {Chef}=require('../models/chef');
const {Occasion}=require('../models/occasion');
const {Recipe_cousine}=require('../models/recipe_cousine');
const {Recipe_cat}=require('../models/recipe_cat');
const {Ingredient}=require('../models/ingredient');
const {Unit}=require('../models/unit');
exports.getRecipes = async (req, res) => {
    const recipes = await Recipe.find().sort('name').populate('_recipe_step');
    res.send(recipes);
};

exports.createRecipe = async (req, res) => {

    const { error } = validateRecipe(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
  
    const recipe_cat= await Recipe_cat.findById(req.body.recipe_catId);
    if(!recipe_cat) return res.status(400).send('Invalid Category');

    const chef= await Chef.findById(req.body.chefId);
    if(!chef) return res.status(400).send('Invalid Chef');

   
    let recipe_occasion=[];
    for (let i=0;i<req.body.recipe_occasionIds.length;i++){
      let result= await Occasion.findById(req.body.recipe_occasionIds[i]);
      if(!result){
        return res.status(400).send('Invalid Occasion');
      } else{
        
        result={
          _id:result._id,
          name:result.name
        };
  
        recipe_occasion.push(result);
       
      }
  
    }
   
    let recipe_cousine=[];
    for (let i=0;i<req.body.recipe_cousineIds.length;i++){
   let result= await Recipe_cousine.findById(req.body.recipe_cousineIds[i]);
    if(!result){
      return res.status(400).send('Invalid Cousine');
    } 
    else{
      result={
        _id:result._id,
        name:result.name
      };
      recipe_cousine.push(result);
    }
    }


    let ingredient=[];
    let total_calories=0;
    
    for (let i=0;i<req.body.ingredients.length;i++){
   
  
   let result= await Ingredient.findById(JSON.parse(req.body.ingredients[i]).Ing);
  
  let ing_cal_amt=await Ingredient.findById(JSON.parse(req.body.ingredients[i]).Ing,'-_id calorie_per_gm');
  let unit=await Unit.findById(JSON.parse(req.body.ingredients[i]).IngUnit,'-_id ');
  total_calories+=ing_cal_amt.calorie_per_gm*JSON.parse(req.body.ingredients[i]).IngAmount*unit.gm_equivalent;
    if(!result){
      return res.status(400).send('Invalid Ingredient');
    } 
    else{
      result={
        Ing_id:result._id,
        Ing:result.name,
        IngAmount:JSON.parse(req.body.ingredients[i]).IngAmount,
        IngUnit:unit.name
      };
     ingredient.push(result);
    }
    }
  console.log(ingredient);
    let recipe = new Recipe({ 
      name: req.body.name,
      desc:req.body.desc,
      recipe_cat:{_id:recipe_cat._id,name:recipe_cat.name},
      cooking_time:req.body.cooking_time,
      ingredients:ingredient,
      difficulty:req.body.difficulty,
      total_calories:total_calories,
      occasions:recipe_occasion,
      cousines:recipe_cousine, 
      age_range:req.body.age_range,
      chef:{_id:chef._id,name:chef.name},
      recipe_image:"/uploads/"+req.file.filename
       
    });
    recipe = await recipe.save();
    
    res.send(recipe);
  
};


exports.updateRecipe =  async (req, res,id) => {
    const { error } = validateRecipe(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
  
    const recipe_cat= await Recipe_cat.findById(req.body.recipe_catId);
    if(!recipe_cat) return res.status(400).send('Invalid Category');
   

    const chef= await Chef.findById(req.body.chefId);
    if(!chef) return res.status(400).send('Invalid Chef');

    let recipe_occasion=[];
    for (let i=0;i<req.body.recipe_occasionIds.length;i++){
      let result= await Occasion.findById(req.body.recipe_occasionIds[i]);
      if(!result){
        return res.status(400).send('Invalid Occasion');
      } else{
        
        result={
          _id:result._id,
          name:result.name
        };
  
        recipe_occasion.push(result);
       
      }
  
    }
   
    let recipe_cousine=[];
    for (let i=0;i<req.body.recipe_cousineIds.length;i++){
   let result= await Recipe_cousine.findById(req.body.recipe_cousineIds[i]);
    if(!result){
      return res.status(400).send('Invalid Cousine');
    } 
    else{
      result={
        _id:result._id,
        name:result.name
      };
      recipe_cousine.push(result);
    }
    }
  
  
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, { 
      name: req.body.name,
      desc:req.body.desc,
      recipe_cat:{
        _id:recipe_cat._id,
        name:recipe_cat.name
      },
      cooking_time:req.body.cooking_time,
      difficulty:req.body.difficulty,
      occasions:recipe_occasion,
      cousines:recipe_cousine, 
      age_range:req.body.age_range,
      chef:chef._id,
      new: true
    });
  
    if (!recipe) return res.status(404).send('The Recipe with the given ID was not found.');
    
    res.send(recipe);
  
};

exports.deleteRecipe = async (req, res,id) => {
    const recipe = await Recipe.findByIdAndRemove(req.params.id);
  
    if (!recipe) return res.status(404).send('The Recipe with the given ID was not found.');
  
    res.send(recipe);
  
};
exports.getRecipe= async (req, res,id) => {
    const recipe = await Recipe.findById(req.params.id);
  
    if (!recipe) return res.status(404).send('The Recipe with the given ID was not found.');
  
    res.send(recipe);
  
};