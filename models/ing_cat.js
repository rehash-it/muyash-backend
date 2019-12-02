const Joi = require('joi');
const mongoose = require('mongoose');

const ing_catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    minlength: 2,
    maxlength: 50
  }
});

const Ing_cat = mongoose.model('Ing_cat', ing_catSchema);

function validateIngCat(ing_cat) {
  const schema = {
    name: Joi.string().min(2).required()
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  return Joi.validate(ing_cat, schema);
}

exports.ing_catSchema = ing_catSchema;
exports.Ing_cat = Ing_cat; 
exports. validateIngCat= validateIngCat;