const {Recipe_cat, validateRecipeCat} = require('../models/recipe_cat');

exports.getRecipeCats =async (req, res) => {
    const recipe_cats = await Recipe_cat.find().sort('name');
    res.send(recipe_cats);
  
};

exports.createRecipeCat = async (req, res) => {
    const { error } = validateRecipeCat(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let recipe_cat = new Recipe_cat({ name: req.body.name });
    recipe_cat = await recipe_cat.save();
    
    res.send(recipe_cat);
  
};
exports.updateRecipeCat = async (req, res,id) => {
    const { error } = validateRecipeCat(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const recipe_cat = await Recipe_cat.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });
  
    if (!recipe_cat) return res.status(404).send('The Recipe category with the given ID was not found.');
    
    res.send(recipe_cat);
  
};

exports.deleteRecipeCat =  async (req, res,id) => {
    const recipe_cat = await Recipe_cat.findByIdAndRemove(req.params.id);
  
    if (!recipe_cat) return res.status(404).send('The Recipe category with the given ID was not found.');
  
    res.send(recipe_cat);
  
};
exports.getRecipeCat= async (req, res,id) => {
    const recipe_cat = await Recipe_cat.findById(req.params.id);
  
    if (!recipe_cat) return res.status(404).send('The Recipe category with the given ID was not found.');
  
    res.send(recipe_cat);
  
};