const Joi = require('joi');
const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    minlength: 2,
    maxlength: 50
  },
  numOfDays :{
      type:Number
  },
  desc:{
    type: String,
    unique:true,
    minlength: 2,
    maxlength: 50  
  }

});

const Diet = mongoose.model('Diet', dietSchema);

function validateDiet(diet) {
  const schema = {
    name: Joi.string().min(2).required(),
    numOfDays: Joi.number().min(1),
    desc:Joi.string().optional()
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  return Joi.validate(diet, schema);
}

exports.dietSchema = dietSchema;
exports.Diet= Diet; 
exports.validateDiet= validateDiet;