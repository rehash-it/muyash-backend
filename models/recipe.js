const Joi = require('joi');
const mongoose = require('mongoose');
const {recipe_catSchema}=require('./recipe_cat'); 
const {recipe_cousineSchema}=require('./recipe_cousine');    
const {occasionSchema}=require('./occasion');    
// const{ingredientShema}=require('./ingredient');
const {chefSchema}=require('./chef');
  const IngSchema={Ing_id:String,
                   Ing:String,
                   IngAmount:Number,
                    IngUnit:String}   

const Difficulty= Object.freeze({
    Easy: 'Easy',
    Medium: 'Medium',
    Hard: 'Hard',
  });
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    minlength: 2,
    maxlength: 50
  },
  desc: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  recipe_cat:{
    type:recipe_catSchema,
    required:true
  },
  cooking_time:{
     type:String,
     required:true
  },
  difficulty:{
    type: String,
    required:true,
    enum: Object.values(Difficulty)
  },
  occasions:{
   type:[ occasionSchema],
   required:true

  },
  cousines:{
   type:[ recipe_cousineSchema],
   required:true
  },
  age_range:{
    type:String,
    required:true
  },
  ingredients:{
    type:[IngSchema],
    required:true
  
  },
  total_calories:{
    type:Number,
    required:true
  },
  // chef:{
  //   type:chefSchema
  // },
  recipe_image:{
    type:String
  },
  numliked:{
     type:Number
  },
  numCooked:{
     type:Number
  }

});

const Recipe = mongoose.model('Recipe', recipeSchema);

function validateRecipe(recipe) {
  const schema = {
    name: Joi.string().min(2).required(),
    desc:Joi.string().min(5).required(),
    recipe_catId:Joi.string().required(),
    cooking_time:Joi.string().required(),
    difficulty:Joi.string().required(),
    recipe_occasionIds: Joi.array().items(Joi.string()).required(),
    recipe_cousineIds:Joi.array().items(Joi.string()).required(),
    age_range:Joi.string().required(),
    ingredients:Joi.required(),
    total_calories:Joi.number(),
    chefId: Joi.string(),
    recipe_image:Joi.string(),
    numLiked:Joi.number(),
    numCooked:Joi.number()
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  return Joi.validate(recipe, schema);
}

exports.recipeSchema = recipeSchema;
exports.Recipe = Recipe; 
exports.validateRecipe = validateRecipe;