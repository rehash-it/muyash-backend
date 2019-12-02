const {UserProfile, validateUserProfile} = require('../models/user_profile');
const {User}=require('../models/user');
exports.getUserProfile = async (req, res) => {
    const userprofile = await UserProfile.findById(req.params.userId);
    res.send(userprofile);
  
};

exports.createUserProfile = async (req, res) => {
    console.log(req.body);  
    const { error } = validateUserProfile(req.body); 
    if (error) return res.status(400).send(error.details[0].message);


    let prefered_ings=[];
    for (let i=0;i<req.body.preferedIngs.length;i++){
      let result= await Ingredient.findById(req.body.preferedIngs[i]);
      if(!result){
        return res.status(400).send('Invalid Ingredient');
      } else{
        
        result={
          _id:result._id,
          name:result.name
        };
  
        prefered_ings.push(result);
       
      }
  
    }

    let exempt_ings=[];
    for (let i=0;i<req.body.exemptIngs.length;i++){
      let result= await Ingredient.findById(req.body.exemptIngs[i]);
      if(!result){
        return res.status(400).send('Invalid Ingredient');
      } else{
        
        result={
          _id:result._id,
          name:result.name
        }
  
        exempt_ings.push(result);
       
      }
  
    }
    let user= await User.findById(req.body.userId);
    if(!user) return res.status(400).send('Invalid User');

    let userprofile = new UserProfile({
        fname: req.body.fname,
        lname:req.body.lname,
        userId:req.body.userId,
        preferedIngs:prefered_ings,
        exemptIngs:exempt_ings
     
        });
    userprofile = await UserProfile.save();
    
    res.send(userprofile);
  
};
exports.updateUserProfile = async (req, res,id) => {
    const { error } = validateUserProfile(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let prefered_ings=[];
    for (let i=0;i<req.body.preferedIngs.length;i++){
        let result= await Ingredient.findById(req.body.preferedIngs[i]);
        if(!result){
            return res.status(400).send('Invalid Ingredient');
        } else{

            result={
                _id:result._id,
                name:result.name
            };

            prefered_ings.push(result);

        }

    }

    let exempt_ings=[];
    for (let i=0;i<req.body.exemptIngs.length;i++){
        let result= await Ingredient.findById(req.body.exemptIngs[i]);
        if(!result){
            return res.status(400).send('Invalid Ingredient');
        } else{

            result={
                _id:result._id,
                name:result.name
            }

            exempt_ings.push(result);

        }

    }
    let user= await User.findById(req.body.userId);
    if(!user) return res.status(400).send('Invalid User');

    const userprofile = await UserProfile.findByIdAndUpdate(
        req.params.id,
        {
            fname: req.body.fname,
            lname:req.body.lname,
            userId:req.body.userId,
            preferedIngs:prefered_ings,
            exemptIngs:exempt_ings
         }, {
      new: true
    });
  
    if (!userprofile) return res.status(404).send('The User with the given ID was not found.');
    
    res.send(userprofile);
  
};

exports.deleteUserProfile= async (req, res,id) => {
    const userprofile = await Userprofile.findByIdAndRemove(req.params.id);
  
    if (!userprofile) return res.status(404).send('The User with the given ID was not found.');
  
    res.send(userprofile);
  
};
exports.updateLikedRecipes = async (req, res,id) => {
  
    const userprofile = await UserProfile.findByIdAndUpdate(req.params.id, { likedRecipes:req.body.likedRecipes }, {
      new: true
    });
  
    if (!userprofile) return res.status(404).send('The User with the given ID was not found.');
    
    res.send(userprofile);
  
};
exports.updateCookedRecipes = async (req, res,id) => {
  
    const userprofile = await UserProfile.findByIdAndUpdate(req.params.id, { cookedRecipes:req.body.cookedRecipes }, {
      new: true
    });
  
    if (!userprofile) return res.status(404).send('The User with the given ID was not found.');
    
    res.send(userprofile);
  
};
exports.updateSavedRecipes = async (req, res,id) => {
  
    const userprofile = await UserProfile.findByIdAndUpdate(req.params.id, { savedRecipes:req.body.savedRecipes }, {
      new: true
    });
  
    if (!userprofile) return res.status(404).send('The User with the given ID was not found.');
    
    res.send(userprofile);
  
};