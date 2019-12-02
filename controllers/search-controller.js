const {Recipe} = require('../models/recipe');
exports.search = (req, res)=>{
    //  console.log(req.query.name.replace(/'/g, ""));
     var queryCond = {}
     
if(req.query.name){
    var regex = new RegExp(req.query.name,'i'); 
   queryCond.name=regex;
}
if(req.query.difficulty){
   queryCond.difficulty=req.query.difficulty;
}
if(req.query.chef){
   queryCond.chef=req.query.chef;
}
if(req.query.occasion){
 queryCong.occasion=req.query.occasion;
}
if(req.query.cousine){
queryCond.recipe_couseine=req.query.cousine;
}
if(req.query.recipe_cat){
    // queryCond.recipe_cat={$in: req.query.recipe_cat}
    // queryCond.recipe_cat = {'$_id' : req.query.recipe_cat}
    queryCond['recipe_cat._id'] = req.query.recipe_cat
}
if(req.query.ingredients){

    queryCond ['ingredients.Ing_id'] = {$all: req.query.ingredients};
    
}
        console.log(queryCond);

        return Recipe.find(queryCond)
        .exec(function(err,result){
            return res.send(result);
        });
 
}



