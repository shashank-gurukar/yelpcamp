const express = require("express");
const router =express.Router()
const User = require('../model/user');
const { model } = require("mongoose");
const passport = require("passport");

router.get('/register',(req,res)=>{
    res.render('users/users')
}) 
router.post('/register', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const user = new User({ email, username }); // Create a new instance of User

    const registeredUser = await User.register(user, password); // Register the user using the register method

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success','User registered successfully.'); // Send a response indicating successful registration
      res.redirect('/campgrounds')
    });
  } catch (err) {
    next(err);
  }
});


router.get('/login',(req,res)=>{
    res.render('users/login')

})
router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
   req.flash('success','welcome back') 
 

   const redirectUrl = req.session.returnTo || '/campgrounds';
   delete req.session.returnTo;
    res.redirect(redirectUrl)

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