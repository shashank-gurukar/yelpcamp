const express = require("express");
const router =express.Router()
const User = require('../model/user');
const { model } = require("mongoose");

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
    req.flash('error',e.messaage)
    res.redirect('register')
   }
}) 

module.exports=router;