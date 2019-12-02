const Joi = require('joi');
const mongoose = require('mongoose');

const recipe_cousineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    minlength: 2,
    maxlength: 50
  },
  icon:{
    type:String
  }
});

const Recipe_cousine = mongoose.model('Recipe_cousine', recipe_cousineSchema);

function validateRecipeCousine(recipe_cousine) {
  const schema = {
    name: Joi.string().min(2).required(),
    icon:Joi.string()
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  return Joi.validate(recipe_cousine, schema);
}

exports.recipe_cousineSchema = recipe_cousineSchema;
exports.Recipe_cousine = Recipe_cousine; 
exports.validateRecipeCousine = validateRecipeCousine;