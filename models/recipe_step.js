const Joi = require('joi');
const mongoose = require('mongoose');
// const {ing_catSchema}=require('./ing_cat');   
const IngSchema={IngName:String,
                  IngAmount:Number,
                IngUnit:String}     
const {recipeSchema}=require('../models/recipe');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

const recipe_stepSchema = new mongoose.Schema({
  recipe: {
    type:mongoose.Schema.Types.ObjectId,  
    ref:'Recipe',
    required:true
  }, 
  step_num: {
   type:Number,
   required:true
  },
  recipe_image:{
   type:String
  },
  desc:{
    type:String,
    required:true
  },
  req_time:{
    type:String,
    required:true
  },
  ings:{ 
    type:[IngSchema],
    required:true
  }

});

const Recipe_step = mongoose.model('Recipe_step', recipe_stepSchema);

function validateRecipeStep(recipe_step) {
  const schema = {
    recipeId:  Joi.objectId().required(),
     step_num: Joi.number().required(),
     recipe_image:Joi.string(),
     desc:Joi.string().required(),
     req_time:Joi.string().required(),
     ings:Joi.array().items(Joi.object()).required()
  };
  return Joi.validate(recipe_step, schema);
}

exports.recipe_stepSchema = recipe_stepSchema;
exports.Recipe_step = Recipe_step;                                                                                                                                                                  
exports.validateRecipeStep = validateRecipeStep;                                                                                                      