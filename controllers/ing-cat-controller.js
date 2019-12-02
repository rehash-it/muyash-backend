const {Ing_cat, validateIngCat} = require('../models/ing_cat');
exports.getIngredientCats = async (req, res) => {
    const ing_cats = await Ing_cat.find().sort('name');
    res.send(ing_cats);
  
};

exports.createIngredientCat = async (req, res) => {
    const { error } = validateIngCat(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let ing_cat = new Ing_cat({ name: req.body.name });
    ing_cat = await ing_cat.save();
    
    res.send(ing_cat);
  
};
exports.updateIngredientCat =async (req, res,id) => {
    const { error } = validateIngCat(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const ing_cat = await Ing_cat.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });
  
    if (!ing_cat) return res.status(404).send('The ingredient category with the given ID was not found.');
    
    res.send(ing_cat);
  
};

exports.deleteIngredientCat=  async (req, res,id) => {
    const ing_cat = await Ing_cat.findByIdAndRemove(req.params.id);
  
    if (!ing_cat) return res.status(404).send('The ingredient category with the given ID was not found.');
  
    res.send(ing_cat);
  
};

exports.getIngredientCat =async (req, res,id) => {
    const ing_cat = await Ing_cat.findById(req.params.id);
  
    if (!ing_cat) return res.status(404).send('The ingredient category with the given ID was not found.');
  
    res.send(ing_cat);
  };
