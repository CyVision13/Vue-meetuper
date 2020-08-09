const User = require('../models/users');

exports.getUsers = function(req, res) {
  User.find({})
        .exec((errors, users) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(users);
  });
}

exports.register = function(req,res){
  const registerData = req.body

  if(!registerData.email){
    return res.status(422).json({
      errors:{
        email:'is required'
      }
    })
  }
  if(!registerData.password){
    return res.status(422).json({
      errors:{
        email:'is required'
      }
    })
  }

  const user = new User(registerData);

  return user.save((errors,savedUser)=>{
    if(errors){
      return res.status(422).json({errors})
      }
      return res.json(savedUser)
  })
  
}