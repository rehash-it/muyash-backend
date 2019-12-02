const {User} = require('../models/user');
const {Chef, validateChef} = require('../models/chef');
const _ = require('lodash');
const bcrypt = require('bcrypt');

exports.getChefs =async (req, res) => {
    const chefs = await Chef.find().sort('name');
    res.send(chefs);
};

exports.createChef =async (req, res) => {
    const { error } = validateChef(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, [ 'email', 'password']));
    console.log(user);
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    await user.save();


    let chef = new Chef({ fname: req.body.fname,lname:req.body.lname,userId:user._id });
    chef = await chef.save();
    
    res.send(chef);
};
exports.updateChef = async (req, res,id) => {
    const { error } = validateChef(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // const { error } = validateUser(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
  
    user = new User(_.pick(req.body, [ 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const chef = await Chef.findByIdAndUpdate(req.params.id, { fname: req.body.fname,lname:req.body.lname,user:user._id}, {
      new: true
    });
  
    if (!chef) return res.status(404).send('The Chef with the given ID was not found.');
    
    res.send(chef);
};


exports.deleteChef =async (req, res,id) => {
    const chef = await Chef.findByIdAndRemove(req.params.id);
  
    if (!chef) return res.status(404).send('The Chef with the given ID was not found.');
  
    res.send(chef);
};
exports.getChef = async (req, res) => {
    const chef= await Chef.findById(req.params.id);
  
    if (!chef) return res.status(404).send('The Chef with the given ID was not found.');
  
    res.send(chef);
};
