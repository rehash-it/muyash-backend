const {Diet, validateDiet} = require('../models/diet');
exports.getDiets =async (req, res) => {
    const diets = await Diet.find().sort('name');
    res.send(diets);
};

exports.createDiet =async (req, res) => {
    const { error } = validateDiet(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let diet = new Diet({ name: req.body.name,numOfDays:req.body.numOfDays,desc:req.body.desc });
    diet = await diet.save();
    
    res.send(diet);
};
exports.updateDiet = async (req, res,id) => {
    const { error } = validateDiet(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const diet = await Diet.findByIdAndUpdate(req.params.id, { name: req.body.name,numOfDays:req.body.numOfDays,desc:req.body.desc }, {
      new: true
    });
  
    if (!diet) return res.status(404).send('The Diet with the given ID was not found.');
    
    res.send(diet);
};


exports.deleteDiet =async (req, res,id) => {
    const diet = await Diet.findByIdAndRemove(req.params.id);
  
    if (!diet) return res.status(404).send('The Diet with the given ID was not found.');
  
    res.send(diet);
};
exports.getDiet = async (req, res,id) => {
    const diet= await Diet.findById(req.params.id);
  
    if (!diet) return res.status(404).send('The Diet with the given ID was not found.');
  
    res.send(diet);
};
