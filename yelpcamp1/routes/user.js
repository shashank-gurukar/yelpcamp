const express = require("express");
const router =express.Router()
const User = require('../model/user');
const { model } = require("mongoose");
const passport = require("passport");

router.get('/register',(req,res)=>{
    res.render('users/users')
}) 
router.post('/register',async (req,res)=>{
   try{
    const {email,username,password} = req.body;
    
    const user = User({email,username})
   const registeredUser= await  User.register(user,password)
  console.log(registeredUser)
  req.flash('success','new account')
  res.redirect('/campgrounds')
   }
   catch(e){
    console.log(e)
    req.flash('error',e.messaage)
    res.redirect('register')
   }
}) 

router.get('/login',(req,res)=>{
    res.render('users/login')

})
router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
   req.flash('success','welcome back') 
    res.redirect('/campgrounds')

})
router.get('/logout', (req, res) => {
    req.logout(function(err) {
      if (err) {
        console.error(err);
        req.flash('error', 'Failed to log out');
      } else {
        req.flash('success', 'Logged out successfully');
      }
      res.redirect('/campgrounds');
    });
  });
  


module.exports=router;