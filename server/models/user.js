const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

//username validation
var usernameValidator = [
    validate({
      validator:'isLength',
      arguments:[3,25],
      message:'Username should be between {ARGS[0]} and {ARGS[1]} characters.'
    }),
    validate({
    validator: 'matches',
    arguments: /^[a-zA-Z]+$/,
    message:'No numbers, only alphabets a-z'
  }),
  
];

//email validation
var emailValidator = [
    validate({
    validator: 'isEmail',
    message:'Not an valid email!.'
  }),
  validate({
    validator:'isLength',
    arguments:[3,25],
    message:'Email should be between {ARGS[0]} and {ARGS[1]} characters.'
  })
];


var UserSchema = new Schema({
  username:{
    type:String,
    required:[true,'Username is required!..'],
    unique: true,
    validate:usernameValidator
    
  },
  email:{type:String,required:true,unique:true,validate:emailValidator},
  password:{type:String,required:true},
  created_at:{type:Date,default:Date.now}
 
});

//methods
UserSchema.pre('save',function(next){
 var user = this;
 bcrypt.hash(user.password,null,null,function(err,hash){
    if(err) return next(err);
    user.password = hash;
    next();
 });
});

//compare password 
UserSchema.methods.comparePassword = function(password){
    var user = this;
   return bcrypt.compareSync(password,user.password);
}

module.exports = mongoose.model('User',UserSchema);


