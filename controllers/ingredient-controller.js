const {Ingredient, validateIngredient} = require('../models/ingredient');
const {Ing_cat}=require('../models/ing_cat');

exports.getIngredients = async (req, res) => {
    const ingredients = await Ingredient.find().sort('name');
    res.send(ingredients);
};

exports.createIngredient =  async (req, res) => {
    const { error } = validateIngredient(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
     const ing_cat= await Ing_cat.findById(req.body.ing_catId);
     if(!ing_cat) return res.status(400).send('Invalid Category');
     if(!req.file) {
        res.status(500);
      }
    //   res.json({ fileUrl: 'http://localhost:3000/' + req.file.filename });

    let ingredient = new Ingredient({
       name: req.body.name ,
       ing_cat:{_id:ing_cat._id,
        name:ing_cat.name
    },
       is_fasting:req.body.is_fasting,
       is_main_ing:req.body.is_main_ing,
       calorie_per_gm:req.body.calorie_per_gm,
       ing_icon:"/uploads/"+req.file.filename
      });
      
    ingredient = await ingredient.save();
    
    res.send(ingredient);
  
};
exports.updateIngredient = async (req, res,id) => {
    const { error } = validateIngredient(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const ing_cat= await Ing_cat.findById(req.body.ing_catId);
    if(!ing_cat) return res.status(400).send('Invalid Category');
  
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, {
       name: req.body.name ,
        ing_cat:{
            _id:ing_cat._id,
            name:ing_cat.name},
    is_fasting:req.body.is_fasting,
    is_main_ing:req.body.is_main_ing,
    calorie_per_gm:req.body.calorie_per_gm,
    ing_icon:req.body.ing_icon
  }, {
      new: true
    });
  
    if (!ingredient) return res.status(404).send('The ingredient with the given ID was not found.');
    
    res.send(ingredient);
  
};

exports.deleteIngredient = async (req, res,id) => {
    const ingredient = await Ingredient.findByIdAndRemove(req.params.id);
  
    if (!ingredient) return res.status(404).send('The ingredient with the given ID was not found.');
  
    res.send(ingredient);
  
};

exports.getIngredient = async (req, res,id) => {
    const ingredient = await Ingredient.findById(req.params.id);
  
    if (!ingredient) return res.status(404).send('The ingredient with the given ID was not found.');
  
    res.send(ingredient);
  
};
