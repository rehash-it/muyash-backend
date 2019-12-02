const {Recipe_step, validateRecipeStep} = require('../models/recipe_step');
const {Recipe}=require('../models/recipe');  
const {Ingredient}=require('../models/ingredient'); 
const {Unit}=require('../models/unit');

exports.getRecipeSteps = async (req, res) => {
    const recipe_steps = await Recipe_step.find().where('recipe').equals(req.params.id).sort('name');
    res.send(recipe_steps);
  };
  
exports.createRecipeStep = async (req, res) => {

    const { error } = validateRecipeStep(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
  
    const recipe= await Recipe.findById(req.body.recipeId);
    if(!recipe) return res.status(400).send('Invalid Recipe');

    let ingredient=[];
  
    for (let i=0;i<req.body.ings.length;i++){
   
  
   let result= await Ingredient.findById(JSON.parse(req.body.ings[i]).Ing);

  let unit=await Unit.findById(JSON.parse(req.body.ings[i]).IngUnit,'-_id ');
    if(!result){
      return res.status(400).send('Invalid Ingredient');
    } 
    else{
      result={
        IngName:result.name,
        IngAmount:JSON.parse(req.body.ings[i]).IngAmount,
        IngUnit:unit.name
      };
     ingredient.push(result);
    }
    }
  
    let recipe_step = new Recipe_step({ 
      recipe:req.body.recipeId,
      step_num: req.body.step_num,
      recipe_image:"/uploads/"+req.file.filename,
      desc:req.body.desc,
      req_time:req.body.req_time,
      ings:ingredient
    });
    recipe_step = await recipe_step.save();
    
    res.send(recipe_step);
  };
exports.updateRecipeStep = async (req, res,id) =>  {
    const { error } = validateRecipeStep(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
  
    const recipe= await Recipe.findById(req.body.recipeId);
    if(!recipe) return res.status(400).send('Invalid Recipe');
  
   
  //   let recipe_cousine=[];
  //   for (let i=0;i<req.body.recipe_cousineIds.length;i++){
  //  let result= await Recipe_cousine.findById(req.body.recipe_cousineIds[i]);
  //   if(!result){
  //     return res.status(400).send('Invalid Cousine');
  //   } 
  //   else{
  //     result={
  //       _id:result._id,
  //       name:result.name
  //     };
  //     recipe_cousine.push(result);
  //   }
  //   }
  
  
  let ingredient=[];
  
  for (let i=0;i<req.body.ingredients.length;i++){
 

 let result= await Ingredient.findById(JSON.parse(req.body.ingredients[i]).Ing);

let unit=await Unit.findById(JSON.parse(req.body.ingredients[i]).IngUnit,'-_id ');
  if(!result){
    return res.status(400).send('Invalid Ingredient');
  } 
  else{
    result={
      Ing:result.name,
      IngAmount:JSON.parse(req.body.ingredients[i]).IngAmount,
      IngUnit:unit.name
    };
   ingredient.push(result);
  }
  }
    const recipe_step = await Recipe_step.findByIdAndUpdate(req.params.id, { 
      recipe: {_id:recipe._id,name:recipe.name},
       step_num: req.body.step_num,
       image:req.file.filename,
       desc:req.body.desc,
       req_time:req.body.req_time,
       ings:ingredient,
      new: true
    });
  
    if (!recipe_step) return res.status(404).send('The Recipe step with the given ID was not found.');
    
    res.send(recipe_step);
  };
  
exports.deleteRecipeStep = async (req, res,id) =>  {
    const recipe_step = await Recipe_step.findByIdAndRemove(req.params.id);
        
    if (!recipe_step) return res.status(404).send('The Recipe step with the given ID was not found.');
  
    res.send(recipe_step);
  };
exports.getRecipeStep= async (req, res,id) =>  {
    const recipe_step = await Recipe_step.findById(req.params.id);
        
    if (!recipe_step) return res.status(404).send('The Recipe step with the given ID was not found.');
  
    res.send(recipe_step);
  };