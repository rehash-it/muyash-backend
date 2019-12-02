const {Recipe_cousine, validateRecipeCousine} = require('../models/recipe_cousine');
exports.getRecipeCousines =  async (req, res) => {
    const recipe_cousines = await Recipe_cousine.find().sort('name');
    res.send(recipe_cousines);
  
};

exports.createRecipeCousine =async (req, res) => {
    const { error } = validateRecipeCousine(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let recipe_cousine = new Recipe_cousine({
         name: req.body.name,
         icon:"/uploads/"+req.file.filename });
    recipe_cousine = await recipe_cousine.save();
    
    res.send(recipe_cousine);
  
};
exports.updateRecipeCousine =async (req, res,id) => {
    const { error } = validateRecipeCousine(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const recipe_cousine = await Recipe_cousine.findByIdAndUpdate(req.params.id, { name: req.body.name ,icon:req.body.icon}, {
      new: true
    });
  
    if (!recipe_cousine) return res.status(404).send('The Recipe cousine with the given ID was not found.');
    
    res.send(recipe_cousine);
  
};

exports.deleteRecipeCousine = async (req, res,id) => {
    const recipe_cousine = await Recipe_cousine.findByIdAndRemove(req.params.id);
  
    if (!recipe_cousine) return res.status(404).send('The Recipe cousine with the given ID was not found.');
  
    res.send(recipe_cousine);
  
};
exports.getRecipeCousine =  async (req, res,id) => {
    const recipe_cousine = await Recipe_cousine.findById(req.params.id);
  
    if (!recipe_cousine) return res.status(404).send('The Recipe cousine with the given ID was not found.');
  
    res.send(recipe_cousine);
  
};

