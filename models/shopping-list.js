const Joi = require('joi');
const mongoose = require('mongoose');
const IngItem={
    Ingredient:mongoose.Schema.Types.ObjectId,
    Amount:mongoose.Schema.Types.ObjectId
}

const shoppingListSchema = new mongoose.Schema({
  userId: {
    Ingredient:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
 item:{
   type:IngItem,
   required:true
  }
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

function validateShoppingList(shopping_list) {
  const schema = {
    item: Joi.object().required()

  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  return Joi.validate(shopping_list, schema);
}

exports.unitSchema = shoppingListSchema;
exports.ShoppingList = ShoppingList; 
exports.validateShoppigList= validateShoppingList;