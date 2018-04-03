const express = require('express');
const User = require('../models/user');
const router = express();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/db');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

// var options = {
//   auth: {
//     api_user: 'SENDGRID_USERNAME',
//     api_key: 'SENDGRID_PASSWORD'
//   }
// }

// var client = nodemailer.createTransport(sgTransport(options));



//signup
router.post('/signup',function(req,res){
   var newUser = User();
   newUser.username = req.body.username,
   newUser.email = req.body.email,
   newUser.password = req.body.password
   
    newUser.save(function(err){
       if(err){
          if(err.errors != null){
                 if(err.errors.username){
              res.json({succcess:false,message:err.errors.username.message});
             }else if(err.errors.email){
               res.json({success:false,message:err.errors.email.message});
             }else{
                res.json({success:false,message:err});
             }
          }else if(err){
             if(err.code == 11000){
               res.json({success:false,message:'Username or Email already taken'});
             }
          }           
       }else{
               
         res.json({success:true,message:'signup successfull.'});
       }
    })
    
});

//username checker
router.post('/checkusername',function(req,res){
  User.findOne({username:req.body.username},function(err,user){
     if(err) throw err;
     if(user){
        res.json({succcess:false,message:'Username already taken.'});
     }else{
        res.json({success:true,message:'Valid username.'})
     }
  });
});

//Email checker
router.post('/checkemail',function(req,res){
  User.findOne({email:req.body.email},function(err,user){
      if(err) throw err;
      if(user){
         res.json({success:false,message:'Email has been taken.'});
      }else{
         res.json({success:true,message:'Valid email.'});
      }
  });
});


//signin
router.post('/signin',function(req,res){
  User.findOne({username:req.body.username},function(err,user){
    if(err) throw err;
    if(!user){
       res.json({success:false,message:'User not found!.'});
    }else if(User){
       var validPassword = user.comparePassword(req.body.password);
       if(!validPassword){
        res.json({success:false,message:'oops.wrong password.'});
       }else{
          var token = jwt.sign({
            id:user._id,
            username:user.username,
            password:user.password,
            email:user.email,
            created_at:user.created_at
          },config.secret,{expiresIn:'1h'});
          res.json({
             success:true,
             message:'Authenticate',
             token: token,
            
          })
       }
    }
    
  });
});

router.use(function(req,res,next){
   var token = req.body.token || req.body.query || req.headers['x-access-token'];
   if(token){
     jwt.verify(token,config.secret,function(err,decoded){
        if(err){
           res.json({success:false,message:'Token invalid'});
        }else{
           req.decoded = decoded;
           next();
        }
     })
   }else{
     res.json({success:false,message:'No token'});
   }
})

//profile
router.get('/profile',function(req,res){
  res.send(req.decoded);
});






module.exports = router;