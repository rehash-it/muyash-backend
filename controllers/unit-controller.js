const {Unit, validateUnit} = require('../models/unit');
exports.getIngredientUnits = async (req, res) => {
    const units = await Unit.find().sort('name');
    res.send(units);
  
};

exports.createIngredientUnit = async (req, res) => {
    const { error } = validateUnit(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let unit = new Unit({ name: req.body.name,gm_equivalent:req.body.gm_equivalent });
    unit = await unit.save();
    
    res.send(unit);
  
};
exports.updateIngredientUnit = async (req, res,id) => {
    const { error } = validateUnit(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const unit = await Unit.findByIdAndUpdate(req.params.id, { name: req.body.name,gm_equivalent:req.body.gm_equivalent }, {
      new: true
    });
  
    if (!unit) return res.status(404).send('The Unit with the given ID was not found.');
    
    res.send(unit);
  
};

exports.deleteIngredientUnit= async (req, res,id) => {
    const unit = await Unit.findByIdAndRemove(req.params.id);
  
    if (!unit) return res.status(404).send('The Unit with the given ID was not found.');
  
    res.send(unit);
  
};

exports.getIngredientUnit = async (req, res,id) => {
    const unit = await Unit.findById(req.params.id);
  
    if (!unit) return res.status(404).send('The Unit with the given ID was not found.');
  
    res.send(unit);
  
};
