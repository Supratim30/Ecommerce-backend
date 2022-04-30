const { find } = require("../models/user");
const User = require("../models/user");
const Order = require("../models/order")


exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
  if(err || !user){
     return res.status(400).json({
       error: "NO USER FOUND!"
     })
  }
  req.profile = user;
  next();
  });
};

exports.getUser = (req, res) => {
 
 req.profile.salt = undefined;
 req.profile.encry_password = undefined;
 req.profile.createdAt = undefined;
req.profile.updatedAt = undefined;

  return res.json(req.profile);
};
//assignment
// exports.allusers = (req, res) => {
//   User.find().exec((err, users) =>{
//     if(err || !users){
//       return res.status(400).json({
//         error: "no users found"
//       })
//     }
// res.json(users)
//   })
// }

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    {_id: req.profile._id},
    {$set: req.body},
    {new: true, useFindAndModify: false}, //compulsory whenever using find by id and update
    (err, user) => {
      if(err){
        return res.status(400).json({
          error: "You are not authorized to update this"
        })
      }
      user.salt = undefined;
 user.encry_password = undefined;
 //user.profile.createdAt = undefined;
//user.profile.updatedAt = undefined;
      res.json(user);
    }
  
  )
}

exports.userPurchaseList = (req, res) => {
Order.find({user: req.profile._id})
.populate("user", "_id name")
.exec((err, order) => {
  if(err){
    return res.status(400).json({
      error: "No order in this account"
    })
  }
  return res.json(order)
}) 
}

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = []
  req.body.order.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    })
    
  });
  
//have to store it in DataBase
User.findOneAndUpdate(
  {_id: req.profile._id},
  {$push: {purchases: purchases}},
  {new: true},
  (err, purchases) => {
    if(err){
      return res.status(400).json({
        error: "UNABLE TO SAVE PURCHASE LIST"
      });
    }
    next();
  }
)
  
}
