const Joi = require('joi');
const mongoose = require('mongoose');

const recipe_catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
   
    minlength: 2,
    maxlength: 50
  }
});

const Recipe_cat = mongoose.model('Recipe_cat', recipe_catSchema);

function validateRecipeCat(recipe_cat) {
  const schema = {
    name: Joi.string().min(2).required()
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  return Joi.validate(recipe_cat, schema);
}

exports.recipe_catSchema = recipe_catSchema;
exports.Recipe_cat = Recipe_cat; 
exports.validateRecipeCat= validateRecipeCat;