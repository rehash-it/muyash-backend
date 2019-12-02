const {Occasion, validateOccasion} = require('../models/occasion');

exports.getOccasions = async (req, res) => {
        const occasions = await Occasion.find().sort('name');
        res.send(occasions);
      
};

exports.createOccasion = async (req, res) => {
        const { error } = validateOccasion(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
      
        let occasion = new Occasion({ name: req.body.name });
        occasion = await occasion.save();
        
        res.send(occasion);
      
};
exports.updateOccasion =  async (req, res,id) => {
        const { error } = validateOccasion(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
      
        const occasion = await Occasion.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
          new: true
        });
      
        if (!occasion) return res.status(404).send('The  Occasion with the given ID was not found.');
        
        res.send(occasion);
      
};
exports.deleteOccasion = async (req, res,id) => {
        const occasion = await Occasion.findByIdAndRemove(req.params.id);
      
        if (!occasion) return res.status(404).send('The Occasion with the given ID was not found.');
      
        res.send(occasion);
      
};

exports.getOccasion = async (req, res,id) => {
        const occasion = await Occasion.findById(req.params.id);
      
        if (!occasion) return res.status(404).send('The Occasion with the given ID was not found.');
      
        res.send(occasion);
      
};