const Joi = require('joi');
const mongoose = require('mongoose');

const occasionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    minlength: 2,
    maxlength: 50
  }
});

const Occasion = mongoose.model('Occasion', occasionSchema);

function validateOccasion(occasion) {
  const schema = {
    name: Joi.string().min(2).required()
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  return Joi.validate(occasion, schema);
}

exports.occasionSchema = occasionSchema;
exports.Occasion = Occasion; 
exports.validateOccasion = validateOccasion;