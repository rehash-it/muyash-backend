const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const user_DietSchema = new mongoose.Schema({

  userId: {
    type: String
  },
  dietId: {
  },
  startDate: {
    type: String,
   
  },
  endDate:{
    type: String,
  }
});



const UserDiet = mongoose.model('UserDiet', user_DietSchema);

function validateUserDiet(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.UserDiet = UserDiet; 
exports.validateUserDiet= validateUserDiet;