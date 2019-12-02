const {Diet_plan, validateDietPlan} = require('../models/diet_plan');
const {Diet} = require('../models/diet');
const {Occasion}=require('../models/occasion');
const {Recipe}=require('../models/recipe');


exports.getDietPlans = async (req, res) => {
        const diets = await Diet_plan.find().sort('name');
        res.send(diets);
};


exports.createDietPlan =  async (req, res) => {
        const { error } = validateDietPlan(req.body); 
        if (error) return res.status(400).send(error.details[0].message);

        const diet= await Diet.findById(req.body.dietId);
        if(!diet) return res.status(400).send('Invalid Diet');
      
        const recipe= await Recipe.findById(req.body.recipeId);
        if(!recipe) return res.status(400).send('Invalid Recipe');
      
        const occasion= await Occasion.findById(req.body.occasionId);
        if(!occasion) return res.status(400).send('Invalid Occasion');

        let diet_plan = new Diet_plan({ 
                diet: {
                        _id:diet._id,
                        name:diet.name
                      },
                    recipe:{
                        _id:recipe._id,
                        name:recipe.name
                      },
                    occasion:{
                        _id:occasion._id,
                        name:occasion.name
                      } ,
          dayNum:req.body.dayNum
          });
        diet_plan = await diet_plan.save();
        
        res.send(diet);
};

exports.updateDietPlan = async (req, res,id) => {
        const { error } = validateDietPlan(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
      
        const diet= await Diet.findById(req.body.dietId);
        if(!diet) return res.status(400).send('Invalid Diet');
      
        const recipe= await Recipe.findById(req.body.recipeId);
        if(!recipe) return res.status(400).send('Invalid Recipe');
      
        const occasion= await Occasion.findById(req.body.occasionId);
        if(!occasion) return res.status(400).send('Invalid Occasion');
      
        const diet_plan = await Diet_plan.findByIdAndUpdate(req.params.id, {
          diet: {
              _id:diet._id,
              name:diet.name
            },
          recipe:{
              _id:recipe._id,
              name:recipe.name
            },
          occasion:{
              _id:occasion._id,
              name:occasion.name
            } ,
          dayNum:req.body.dayNum
      }, {
          new: true
        });
      
        if (!diet_plan) return res.status(404).send('The Diet Plan with the given ID was not found.');
        
        res.send(diet_plan);
};

exports.deleteDietPlan =async (req, res,id) => {
        const diet = await Diet_plan.findByIdAndRemove(req.params.id);
      
        if (!diet) return res.status(404).send('The Diet plan with the given ID was not found.');
      
        res.send(diet);
};

exports.getDietPlan = async (req, res,id) => {
        const diet= await Diet.findById(req.params.id);
      
        if (!diet) return res.status(404).send('The Diet with the given ID was not found.');
      
        res.send(diet);
};