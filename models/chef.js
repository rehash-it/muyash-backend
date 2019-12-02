const Joi = require('joi');
const mongoose = require('mongoose');
const chefSchema = new mongoose.Schema({

  fname: {
    type: String
  },
 lname: {
    type: String
  },
  userId: {
    type:mongoose.Schema.Types.ObjectId,  
    unique:true,
    ref:'User',
    required:true
  }
});

const Chef = mongoose.model('Chef', chefSchema);

function validateChef(chef) {
  const schema = {
    fname: Joi.string().min(5).max(255).required(),
    lname: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(chef, schema);
}

exports.Chef = Chef; 
exports.validateChef= validateChef;