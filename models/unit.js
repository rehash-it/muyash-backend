const Joi = require('joi');
const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    minlength: 2,
    maxlength: 50
  },
  gm_equivalent:{
   type:Number,
   required:true
  }
});

const Unit = mongoose.model('Unit', unitSchema);

function validateUnit(unit) {
  const schema = {
    name: Joi.string().min(2).required(),
    gm_equivalent:Joi.number().required()
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  return Joi.validate(unit, schema);
}

exports.unitSchema = unitSchema;
exports.Unit = Unit; 
exports.validateUnit= validateUnit;