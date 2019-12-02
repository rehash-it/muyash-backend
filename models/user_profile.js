const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const {userSchema}=require('./user');
const {IngredientSchema}=require('./ingredient');
const {RecipeSchema}=require('./recipe');

const user_profileSchema = new mongoose.Schema({

  fname: {
    type: String,
    required:true
  },
  lname: {
    type: String,
    required:true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  preferedIngs: {
    type:[ IngredientSchema]
  },
  exemptIngs: {
    type:[ IngredientSchema]
  
  },
  savedRecipes: {
    type:[RecipeSchema]
   
  },
  cookedRecipes: {
    type:[ RecipeSchema]
   
  },
  likedRecipes: {
    type: [RecipeSchema]
  }
});



const UserProfile = mongoose.model('User_profile', user_profileSchema);

function validateUserProfile(user_profile) {
  const schema = {
    fname: Joi.string().min(5).max(255).required(),
    lname: Joi.string().min(5).max(255).required(),
    userId:Joi.ObjectId(),
    preferedIngs:Joi.array().items(Joi.ObjectId),
    exemptIngs:Joi.array().items(Joi.ObjectId),
    savedRecipes:Joi.array().items(Joi.ObjectId),
    cookedRecipes:Joi.array().items(Joi.ObjectId),
    likedRecipes:Joi.array().items(Joi.ObjectId)
  };

  return Joi.validate(user_profile, schema);
}

exports.UserProfile = UserProfile; 
exports.validateUserProfile= validateUserProfile;