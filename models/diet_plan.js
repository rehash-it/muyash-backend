const Joi = require('joi');
const mongoose = require('mongoose');
const {dietSchema}=require('./diet'); 
const {occasionSchema}=require('./occasion'); 
const {recipeSchema}=require('./recipe');

const diet_planSchema = new mongoose.Schema({
  diet: {
    type:dietSchema,
   
    required:true
  },
  recipe :{
    type:recipeSchema,
   
    required:true
  },
  occasion:{
    type:occasionSchema,
  
    required:true
  },
  dayNum:{
      type:Number
  }
});

const Diet_plan = mongoose.model('Diet_plan', diet_planSchema);

function validateDietPlan(diet_plan) {
  const schema = {
    dietId: Joi.objectId().required(),
    recipeId:  Joi.objectId().required(),
    occasionId: Joi.objectId().required(),
    dayNum:Joi.number().min(1)
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  return Joi.validate(diet_plan, schema);
}

exports.diet_planSchema = diet_planSchema;
exports.Diet_plan= Diet_plan; 
exports.validateDietPlan = validateDietPlan;