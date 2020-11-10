var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Sign up
router.post('/register', (req, res, next)=>{
  const {username, password} = req.body;

  //password şifrelemek için bcrypt(user_pass, şifreleme_aralığı) kullandık.
  bcrypt.hash(password, 10).then((hash)=>{
    const user = new User({
      username,
      password: hash
    });
  
    const promise = user.save();
  
    promise.then((data)=>{
      res.json(data.username);
    }).catch((err)=>{
      res.json(err);
    });
  });
});

//Sign In
router.post('/authenticate', (req, res)=>{
 const {username, password} = req.body;

 User.findOne({username}, (err, user) =>{
   if(err) throw err;

   if(!user){
     res.json({
       status: false,
       message: "Authentication failed, user not found."
     });
   }
   else{
     bcrypt.compare(password, user.password).then((result)=>{
       if(!result){
         res.json({
          status: false,
          message: "Authentication failed, wrong password."
         });
       }
       else{
         const payload = {username};
         const token = jwt.sign(payload, req.app.get('api_secret_key'), {
           //expirein -> kullanıcı kaç dakika aktif kalabilir
           expiresIn: 720 // 12 saat
         });
         res.json({
           status: true,
           token
         });
       }
     });
   }
 });
});

module.exports = router;
