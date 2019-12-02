const Joi = require('joi');
const mongoose = require('mongoose');
const ingCatSchema=require('../models/ing_cat');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    minlength: 2,
    maxlength: 50
  }, 
  ing_cat: {
  type:ingCatSchema,
  required:true
  },
  is_fasting:{
    type:Boolean,
    required:true
  },
  is_main_ing:{
    type:Boolean,
    required:true
  },
  calorie_per_gm:{
    type:Number,
    required:true
  },
  ing_icon:{
    type:String,
    required:true
  }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

function validateIngredient(ingredient) {
  const schema = {
    name: Joi.string().min(2).required(),
    ing_catId: Joi.objectId().required(),
    is_fasting:Joi.boolean().required(),
    is_main_ing:Joi.boolean().required(),
    calorie_per_gm:Joi.number().required()
    // ing_icon:Joi.string().required()
  };
  return Joi.validate(ingredient, schema);
}

exports.ingredientSchema = ingredientSchema;
exports.Ingredient = Ingredient;                                                                                                                                                                  
exports.validateIngredient = validateIngredient;                                                                                                      